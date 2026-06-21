import { useState, useRef, useEffect } from "react"
import {
  fetchWhakatauki,
  fetchConditions,
  fetchLearningResources,
  fetchReflectionTemplates,
  fetchProfileSeeds
} from "../api/content.api"

export default function GlobalSearch({ onNavigate }) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const [data, setData] = useState({
    whakatauki: [],
    conditions: [],
    resources: [],
    reflections: [],
    seeds: []
  })
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null) // for details modal
  const containerRef = useRef(null)

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Load all search data when user focuses search bar
  async function handleFocus() {
    setFocused(true)
    if (loading || data.whakatauki.length > 0) return // already loaded

    setLoading(true)
    try {
      const [w, c, r, t, s] = await Promise.all([
        fetchWhakatauki().catch(() => []),
        fetchConditions().catch(() => []),
        fetchLearningResources().catch(() => []),
        fetchReflectionTemplates().catch(() => []),
        fetchProfileSeeds().catch(() => [])
      ])
      setData({
        whakatauki: w || [],
        conditions: c || [],
        resources: r || [],
        reflections: t || [],
        seeds: s || []
      })
    } catch (err) {
      console.error("Global search fetch failed", err)
    } finally {
      setLoading(false)
    }
  }

  // Filter items matching the query
  const q = query.trim().toLowerCase()
  const results = {
    whakatauki: q ? data.whakatauki.filter(x => 
      x.text?.toLowerCase().includes(q) || 
      x.translation?.toLowerCase().includes(q) || 
      x.theme?.toLowerCase().includes(q)
    ) : [],
    conditions: q ? data.conditions.filter(x => 
      x.title?.toLowerCase().includes(q) || 
      x.summary?.toLowerCase().includes(q)
    ) : [],
    resources: q ? data.resources.filter(x => 
      x.title?.toLowerCase().includes(q) || 
      x.description?.toLowerCase().includes(q)
    ) : [],
    reflections: q ? data.reflections.filter(x => 
      x.title?.toLowerCase().includes(q) || 
      x.prompt?.toLowerCase().includes(q) ||
      x.category?.toLowerCase().includes(q)
    ) : [],
    seeds: q ? data.seeds.filter(x => 
      x.name?.toLowerCase().includes(q) || 
      x.value?.toLowerCase().includes(q)
    ) : []
  }

  const hasResults = Object.values(results).some(arr => arr.length > 0)

  return (
    <div ref={containerRef} className="relative px-4 mb-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search database..."
          className="input input-sm input-bordered w-full pl-8 rounded-xl focus:outline-primary bg-base-100"
          value={query}
          onFocus={handleFocus}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && (
          <span className="loading loading-spinner loading-xs absolute right-3 top-2 text-primary"></span>
        )}
      </div>

      {/* Floating Results Panel */}
      {focused && query && (
        <div className="absolute left-4 right-4 mt-2 bg-base-100 border border-base-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto p-2 glass">
          {!hasResults ? (
            <div className="text-center py-6 text-xs text-base-content/50">
              No matching records found.
            </div>
          ) : (
            <div className="space-y-3">
              {results.whakatauki.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-primary px-2 mb-1">Whakataukī</div>
                  <div className="space-y-0.5">
                    {results.whakatauki.map(x => (
                      <button
                        key={`w-${x.id}`}
                        className="w-full text-left px-2 py-1.5 hover:bg-base-200 rounded-lg text-xs truncate block"
                        onClick={() => {
                          setSelectedItem({ ...x, _type: "Whakataukī", _page: "whakatauki" })
                          setFocused(false)
                        }}
                      >
                        “{x.text}”
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.conditions.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-secondary px-2 mb-1">Conditions</div>
                  <div className="space-y-0.5">
                    {results.conditions.map(x => (
                      <button
                        key={`c-${x.id}`}
                        className="w-full text-left px-2 py-1.5 hover:bg-base-200 rounded-lg text-xs truncate block"
                        onClick={() => {
                          setSelectedItem({ ...x, _type: "Condition", _page: "conditions" })
                          setFocused(false)
                        }}
                      >
                        🏥 {x.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.resources.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-accent px-2 mb-1">Resources</div>
                  <div className="space-y-0.5">
                    {results.resources.map(x => (
                      <button
                        key={`r-${x.id}`}
                        className="w-full text-left px-2 py-1.5 hover:bg-base-200 rounded-lg text-xs truncate block"
                        onClick={() => {
                          setSelectedItem({ ...x, _type: "Resource", _page: "learningResources" })
                          setFocused(false)
                        }}
                      >
                        📚 {x.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.reflections.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-info px-2 mb-1">Reflections</div>
                  <div className="space-y-0.5">
                    {results.reflections.map(x => (
                      <button
                        key={`t-${x.id}`}
                        className="w-full text-left px-2 py-1.5 hover:bg-base-200 rounded-lg text-xs truncate block"
                        onClick={() => {
                          setSelectedItem({ ...x, _type: "Reflection Template", _page: "reflectionTemplates" })
                          setFocused(false)
                        }}
                      >
                        📝 {x.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.seeds.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral px-2 mb-1">Profile Seeds</div>
                  <div className="space-y-0.5">
                    {results.seeds.map(x => (
                      <button
                        key={`s-${x.id}`}
                        className="w-full text-left px-2 py-1.5 hover:bg-base-200 rounded-lg text-xs truncate block"
                        onClick={() => {
                          setSelectedItem({ ...x, _type: "Profile Seed", _page: "profileSeeds" })
                          setFocused(false)
                        }}
                      >
                        👤 {x.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Details Preview Modal */}
      {selectedItem && (
        <div className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-md">
            <div className="flex justify-between items-start mb-2">
              <span className="badge badge-primary font-bold text-xs capitalize">{selectedItem._type}</span>
              <span className="text-xs text-base-content/40">ID: {selectedItem.id}</span>
            </div>

            {/* Display appropriate details depending on the item type */}
            <div className="space-y-4 my-4">
              {selectedItem._type === "Whakataukī" && (
                <>
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-base-content/50">Whakataukī</div>
                    <p className="text-base font-semibold italic">“{selectedItem.text}”</p>
                  </div>
                  {selectedItem.translation && (
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-base-content/50">Translation</div>
                      <p className="text-sm">{selectedItem.translation}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="opacity-60">Theme:</span> <span className="font-semibold">{selectedItem.theme || "—"}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Source:</span> <span className="font-semibold">{selectedItem.source || "—"}</span>
                    </div>
                  </div>
                </>
              )}

              {selectedItem._type === "Condition" && (
                <>
                  <h3 className="font-bold text-xl">{selectedItem.title}</h3>
                  {selectedItem.summary && (
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-base-content/50">Summary</div>
                      <p className="text-sm">{selectedItem.summary}</p>
                    </div>
                  )}
                  {selectedItem.triggers && (
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-base-content/50">Triggers</div>
                      <p className="text-xs bg-base-200 p-2 rounded">{selectedItem.triggers}</p>
                    </div>
                  )}
                  {selectedItem.treatments && (
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-base-content/50">Treatments</div>
                      <p className="text-xs bg-base-200 p-2 rounded">{selectedItem.treatments}</p>
                    </div>
                  )}
                </>
              )}

              {selectedItem._type === "Resource" && (
                <>
                  <h3 className="font-bold text-lg">📚 {selectedItem.title}</h3>
                  {selectedItem.description && (
                    <p className="text-sm text-base-content/80">{selectedItem.description}</p>
                  )}
                  <div className="text-xs space-y-1">
                    <div>
                      <span className="opacity-60">Type:</span> <span className="font-semibold capitalize">{selectedItem.type || "—"}</span>
                    </div>
                    {selectedItem.file_path && (
                      <div>
                        <span className="opacity-60">URL/Path:</span>{" "}
                        <a href={selectedItem.file_path} target="_blank" rel="noopener noreferrer" className="link link-primary break-all">
                          {selectedItem.file_path}
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}

              {selectedItem._type === "Reflection Template" && (
                <>
                  <h3 className="font-bold text-lg">📝 {selectedItem.title}</h3>
                  <div className="text-xs opacity-60 uppercase mb-2">Category: {selectedItem.category}</div>
                  <div className="p-3 bg-base-200 rounded-xl text-sm italic font-medium">
                    “{selectedItem.prompt}”
                  </div>
                </>
              )}

              {selectedItem._type === "Profile Seed" && (
                <>
                  <div className="text-xs opacity-50 uppercase">Profile Seed Name</div>
                  <h3 className="font-bold text-lg">{selectedItem.name}</h3>
                  <div className="text-xs opacity-50 uppercase mt-2">Value</div>
                  <pre className="p-3 bg-base-200 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap">
                    {selectedItem.value}
                  </pre>
                </>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs border-t border-base-200 pt-3">
                <div>
                  <span className="opacity-60">Status:</span>{" "}
                  <span className={`badge badge-xs font-semibold ${selectedItem.status === "published" ? "badge-success text-white" : "badge-warning"}`}>
                    {selectedItem.status || "draft"}
                  </span>
                </div>
                <div>
                  <span className="opacity-60">Sort Order:</span> <span className="font-semibold">{selectedItem.sort_order ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="modal-action border-t border-base-200 pt-3">
              <button className="btn btn-ghost btn-sm rounded-xl" onClick={() => setSelectedItem(null)}>
                Close
              </button>
              <button
                className="btn btn-primary btn-sm rounded-xl"
                onClick={() => {
                  onNavigate(selectedItem._page)
                  setSelectedItem(null)
                }}
              >
                Go to Section
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
            <button>close</button>
          </div>
        </div>
      )}
    </div>
  )
}
