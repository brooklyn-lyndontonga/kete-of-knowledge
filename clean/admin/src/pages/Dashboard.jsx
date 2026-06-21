import { useEffect, useState } from "react"
import {
  fetchConditions,
  fetchLearningResources,
  fetchWhakatauki,
  fetchAuditLogs,
  createWhakatauki,
  createLearningResource,
  createCondition
} from "../api/content.api"
import SnapshotsOverview from "../components/Snapshots"

export default function Dashboard() {
  const [stats, setStats] = useState({
    conditions: 0,
    resources: 0,
    whakatauki: 0
  })
  const [logs, setLogs] = useState([])
  const [healthIssues, setHealthIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [logsLoading, setLogsLoading] = useState(true)

  // Quick Add State
  const [quickAddType, setQuickAddType] = useState(null) // null | 'whakatauki' | 'resource' | 'condition'
  const [form, setForm] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" }) // type: 'success' | 'error'

  async function loadDashboardData() {
    setLoading(true)
    try {
      const [conditions, resources, whakatauki] = await Promise.all([
        fetchConditions().catch(() => []),
        fetchLearningResources().catch(() => []),
        fetchWhakatauki().catch(() => [])
      ])

      setStats({
        conditions: conditions?.length || 0,
        resources: resources?.length || 0,
        whakatauki: whakatauki?.length || 0
      })

      // Run health check
      const issues = runHealthCheck(whakatauki || [], resources || [], conditions || [])
      setHealthIssues(issues)
    } catch (error) {
      console.error("Failed to load stats", error)
    } finally {
      setLoading(false)
    }
  }

  async function loadLogs() {
    setLogsLoading(true)
    try {
      const auditLogs = await fetchAuditLogs()
      setLogs(auditLogs || [])
    } catch (error) {
      console.error("Failed to load audit logs", error)
    } finally {
      setLogsLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
    loadLogs()
  }, [])

  function runHealthCheck(whakatauki, resources, conditions) {
    const issues = []

    whakatauki.forEach((item) => {
      if (!item.translation || item.translation.trim() === "") {
        issues.push({
          type: "Whakataukī",
          id: item.id,
          title: item.text.slice(0, 40) + (item.text.length > 40 ? "..." : ""),
          issue: "Missing translation translation",
          severity: "warning"
        })
      }
      if (!item.theme || item.theme.trim() === "") {
        issues.push({
          type: "Whakataukī",
          id: item.id,
          title: item.text.slice(0, 40) + (item.text.length > 40 ? "..." : ""),
          issue: "Missing theme category",
          severity: "info"
        })
      }
    })

    resources.forEach((item) => {
      if (!item.file_path || item.file_path.trim() === "") {
        issues.push({
          type: "Learning Resource",
          id: item.id,
          title: item.title,
          issue: "Missing file link or URL path",
          severity: "warning"
        })
      }
    })

    conditions.forEach((item) => {
      if (!item.summary || item.summary.trim() === "") {
        issues.push({
          type: "Condition",
          id: item.id,
          title: item.title,
          issue: "Missing summary description",
          severity: "warning"
        })
      } else if (item.summary.trim().length < 20) {
        issues.push({
          type: "Condition",
          id: item.id,
          title: item.title,
          issue: "Summary is very short (under 20 characters)",
          severity: "info"
        })
      }
    })

    return issues
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleQuickAddSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setMessage({ text: "", type: "" })

    try {
      if (quickAddType === "whakatauki") {
        await createWhakatauki({
          text: form.text,
          translation: form.translation,
          theme: form.theme,
          source: form.source,
          status: form.status || "draft",
          sort_order: Number(form.sort_order) || 0
        })
      } else if (quickAddType === "resource") {
        await createLearningResource({
          title: form.title,
          description: form.description,
          type: form.type,
          file_path: form.file_path,
          status: form.status || "draft",
          sort_order: Number(form.sort_order) || 0
        })
      } else if (quickAddType === "condition") {
        await createCondition({
          title: form.title,
          summary: form.summary,
          triggers: form.triggers,
          treatments: form.treatments,
          status: form.status || "draft",
          sort_order: Number(form.sort_order) || 0
        })
      }

      setMessage({ text: "Content successfully added!", type: "success" })
      setForm({})
      setQuickAddType(null)
      loadDashboardData()
      loadLogs()

      // Flash success message
      setTimeout(() => setMessage({ text: "", type: "" }), 3000)
    } catch (error) {
      setMessage({ text: error.message || "Failed to add content.", type: "error" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kete Dashboard</h1>
          <p className="text-base-content/60 mt-1">
            Manage your knowledge database, check content health, and monitor audits.
          </p>
        </div>
        {message.text && (
          <div
            className={`alert shadow-lg py-2 px-4 rounded-lg w-auto ${
              message.type === "success" ? "alert-success text-success-content" : "alert-error"
            }`}
          >
            <span>{message.text}</span>
          </div>
        )}
      </header>

      {/* Quick Add Actions */}
      <section className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          ⚡ Quick Add Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="btn btn-outline btn-primary flex flex-col items-center justify-center p-6 h-auto normal-case hover:scale-[1.02] transition-transform"
            onClick={() => {
              setForm({ status: "draft", sort_order: 0 })
              setQuickAddType("whakatauki")
            }}
          >
            <span className="text-xl">💬</span>
            <span className="font-semibold mt-1">Add Whakataukī</span>
            <span className="text-xs opacity-60">Add a proverb with translation</span>
          </button>
          <button
            className="btn btn-outline btn-secondary flex flex-col items-center justify-center p-6 h-auto normal-case hover:scale-[1.02] transition-transform"
            onClick={() => {
              setForm({ status: "draft", sort_order: 0, type: "link" })
              setQuickAddType("resource")
            }}
          >
            <span className="text-xl">📚</span>
            <span className="font-semibold mt-1">Add Learning Resource</span>
            <span className="text-xs opacity-60">Link, document, or article URL</span>
          </button>
          <button
            className="btn btn-outline btn-accent flex flex-col items-center justify-center p-6 h-auto normal-case hover:scale-[1.02] transition-transform"
            onClick={() => {
              setForm({ status: "draft", sort_order: 0 })
              setQuickAddType("condition")
            }}
          >
            <span className="text-xl">🏥</span>
            <span className="font-semibold mt-1">Add Condition Info</span>
            <span className="text-xs opacity-60">Symptoms, triggers, treatments</span>
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="stats shadow-sm w-full bg-base-100 border border-base-200 rounded-2xl">
        <div className="stat">
          <div className="stat-figure text-primary">
            <span className="text-2xl">🏥</span>
          </div>
          <div className="stat-title text-base-content/60">Total Conditions</div>
          <div className="stat-value text-primary">
            {loading ? <span className="loading loading-xs"></span> : stats.conditions}
          </div>
          <div className="stat-desc">Primary diagnostic categories</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <span className="text-2xl">📚</span>
          </div>
          <div className="stat-title text-base-content/60">Resources</div>
          <div className="stat-value text-secondary">
            {loading ? <span className="loading loading-xs"></span> : stats.resources}
          </div>
          <div className="stat-desc">Articles, PDFs, and website links</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <span className="text-2xl">💬</span>
          </div>
          <div className="stat-title text-base-content/60">Whakatauākī</div>
          <div className="stat-value text-accent">
            {loading ? <span className="loading loading-xs"></span> : stats.whakatauki}
          </div>
          <div className="stat-desc">Proverbs and theme concepts</div>
        </div>
      </div>

      {/* Split layout: Content Health vs Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Health Indicators */}
        <section className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex flex-col">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            🛡️ Content Health Checker
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-12 flex-grow">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          ) : healthIssues.length === 0 ? (
            <div className="text-center py-12 flex flex-col justify-center items-center flex-grow bg-success/5 rounded-xl border border-success/20">
              <span className="text-3xl mb-2">🎉</span>
              <p className="font-semibold text-success">All Content is Healthy!</p>
              <p className="text-xs text-base-content/50 mt-1">No missing fields or translations found.</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[350px] flex-grow pr-2">
              <p className="text-xs text-base-content/60 mb-3">
                Found {healthIssues.length} items requiring review or translation updates:
              </p>
              <div className="space-y-3">
                {healthIssues.map((issue, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 bg-base-200/50 hover:bg-base-200 rounded-xl transition-colors border border-base-200/40 text-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs opacity-75">{issue.type}</span>
                        <span className={`badge badge-xs font-bold ${issue.severity === "warning" ? "badge-warning" : "badge-info"}`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="font-medium mt-0.5 text-base-content/85">{issue.title}</p>
                      <p className="text-xs text-error mt-0.5">{issue.issue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Audit Logs / Activity Feed */}
        <section className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex flex-col">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            📋 System Activity Feed
          </h2>
          {logsLoading ? (
            <div className="flex justify-center items-center py-12 flex-grow">
              <span className="loading loading-spinner text-secondary"></span>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 flex-grow text-base-content/50">
              No audit logs captured yet.
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[350px] flex-grow pr-2">
              <div className="space-y-3">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-base-200/30 hover:bg-base-200/60 rounded-xl transition-colors border border-base-200/40 text-xs flex justify-between items-start gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`badge badge-xs font-bold ${
                            log.action === "CREATE"
                              ? "badge-success text-white"
                              : log.action === "UPDATE"
                              ? "badge-info text-white"
                              : "badge-error text-white"
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="font-semibold uppercase text-[10px] opacity-60">
                          {log.tableName} (ID: {log.recordId})
                        </span>
                      </div>
                      <p className="text-base-content/80 font-medium">{log.details}</p>
                      <p className="text-[10px] text-base-content/50">
                        Performed by <span className="font-semibold text-base-content/70">{log.performedBy}</span>
                      </p>
                    </div>
                    <span className="text-[10px] text-base-content/40 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Collapsible/Secondary Mood & Energy Snapshots */}
      <section className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
        <div className="collapse collapse-plus">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-bold p-0 min-h-0 flex items-center">
            😊 Mood & Energy Snapshots
          </div>
          <div className="collapse-content px-0 pt-4">
            <SnapshotsOverview />
          </div>
        </div>
      </section>

      {/* Quick Add Modal */}
      {quickAddType && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg rounded-2xl">
            <h3 className="font-bold text-lg capitalize mb-4">
              Quick Add {quickAddType === "whakatauki" ? "Whakataukī" : quickAddType}
            </h3>

            <form onSubmit={handleQuickAddSubmit} className="space-y-4">
              {quickAddType === "whakatauki" && (
                <>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Whakataukī Text *</span></label>
                    <textarea
                      name="text"
                      className="textarea textarea-bordered h-20"
                      required
                      placeholder="E.g., Kia ora..."
                      value={form.text || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Translation</span></label>
                    <textarea
                      name="translation"
                      className="textarea textarea-bordered h-20"
                      placeholder="Translation in English"
                      value={form.translation || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Theme</span></label>
                      <input
                        type="text"
                        name="theme"
                        className="input input-bordered"
                        placeholder="Theme / Category"
                        value={form.theme || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Source</span></label>
                      <input
                        type="text"
                        name="source"
                        className="input input-bordered"
                        placeholder="Source / Author"
                        value={form.source || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {quickAddType === "resource" && (
                <>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Title *</span></label>
                    <input
                      type="text"
                      name="title"
                      className="input input-bordered"
                      required
                      placeholder="Resource Title"
                      value={form.title || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Description</span></label>
                    <textarea
                      name="description"
                      className="textarea textarea-bordered h-20"
                      placeholder="Brief details about this resource"
                      value={form.description || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Type</span></label>
                      <select
                        name="type"
                        className="select select-bordered"
                        value={form.type || "link"}
                        onChange={handleInputChange}
                      >
                        <option value="link">Link / URL</option>
                        <option value="pdf">PDF File</option>
                        <option value="doc">Document</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">File Path / URL</span></label>
                      <input
                        type="text"
                        name="file_path"
                        className="input input-bordered"
                        placeholder="https://..."
                        value={form.file_path || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {quickAddType === "condition" && (
                <>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Condition Title *</span></label>
                    <input
                      type="text"
                      name="title"
                      className="input input-bordered"
                      required
                      placeholder="E.g., Chronic Fatigue"
                      value={form.title || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Summary *</span></label>
                    <textarea
                      name="summary"
                      className="textarea textarea-bordered h-20"
                      required
                      placeholder="Short medical summary or info"
                      value={form.summary || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Triggers</span></label>
                    <textarea
                      name="triggers"
                      className="textarea textarea-bordered h-16"
                      placeholder="List common triggers..."
                      value={form.triggers || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Treatments</span></label>
                    <textarea
                      name="treatments"
                      className="textarea textarea-bordered h-16"
                      placeholder="List possible treatments..."
                      value={form.treatments || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Publishing Status</span></label>
                  <select
                    name="status"
                    className="select select-bordered"
                    value={form.status || "draft"}
                    onChange={handleInputChange}
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Live)</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-medium">Sort Order Priority</span></label>
                  <input
                    type="number"
                    name="sort_order"
                    className="input input-bordered"
                    placeholder="0"
                    value={form.sort_order || 0}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="modal-action pt-4 border-t border-base-200">
                <button
                  type="button"
                  className="btn btn-ghost rounded-xl"
                  onClick={() => setQuickAddType(null)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded-xl"
                  disabled={submitting}
                >
                  {submitting ? <span className="loading loading-spinner loading-xs"></span> : "Save Entry"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setQuickAddType(null)}>
            <button type="button">close</button>
          </div>
        </div>
      )}
    </div>
  )
}
