#!/usr/bin/env node
/**
 * seed-remote.mjs — pushes the beta content (4 bilingual conditions,
 * 3 whakataukī, 3 learning resources, all PUBLISHED) to a running
 * Kete of Knowledge server via its admin API.
 *
 * Usage:
 *   node seed-remote.mjs https://kete-server-production.up.railway.app
 *   node seed-remote.mjs https://... --token YOUR_AUTH0_ACCESS_TOKEN
 *
 * Auth: if the server has AUTH0_DOMAIN configured, admin routes need a
 * Bearer token. Get one by opening the Kete Admin panel, logging in,
 * opening DevTools → Network, clicking any list (e.g. Conditions), and
 * copying the "Authorization: Bearer eyJ..." header from a request to
 * /api/admin/... — pass everything after "Bearer " via --token.
 * If AUTH0_DOMAIN is NOT set, no token is needed (the server skips auth).
 *
 * Safe to re-run: it checks existing titles/text first and skips
 * anything already present, so it never duplicates.
 */

const args = process.argv.slice(2)
const base = (args.find((a) => a.startsWith("http")) || "").replace(/\/$/, "")
const tokenIx = args.indexOf("--token")
const token = tokenIx > -1 ? args[tokenIx + 1] : null

if (!base) {
  console.error("Usage: node seed-remote.mjs <server-url> [--token AUTH0_TOKEN]")
  process.exit(1)
}

const headers = { "Content-Type": "application/json" }
if (token) headers["Authorization"] = `Bearer ${token}`

async function api(method, path, body) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  return { status: res.status, data }
}

const conditions = [
  { title: "Diabetes (Type 2)", summary: "A long-term condition where the body struggles to manage blood sugar. It can be managed well with kai choices, movement, and medication.", triggers: "Sugary drinks and kai, low activity, whānau history, stress.", treatments: "Healthy kai, regular movement, metformin or other prescribed medicines, regular checks with your nurse or GP.", title_mi: "Mate huka", summary_mi: "He mate roa e uaua ai te whakahaere a te tinana i te huka o te toto.", triggers_mi: "Ngā inu reka, te kai reka, te kore korikori, te hītori o te whānau.", treatments_mi: "Kai hauora, korikori tinana, rongoā kua tohua, arotake auau.", status: "published", sort_order: 1 },
  { title: "Asthma (Huangō)", summary: "A condition that makes breathing harder when airways tighten. Most people manage it well with inhalers and a clear action plan.", triggers: "Cold air, dust, pollen, smoke, colds and flu, exercise without warm-up.", treatments: "Reliever and preventer inhalers, an asthma action plan, avoiding known triggers.", title_mi: "Huangō", summary_mi: "He mate e uaua ai te ngā i te kūitinga o ngā arahau.", triggers_mi: "Te hau makariri, te puehu, te hae pua, te auahi.", treatments_mi: "Ngā inhaler, he mahere mahi huangō, te karo i ngā take.", status: "published", sort_order: 2 },
  { title: "High blood pressure", summary: "Often has no symptoms but raises the risk of heart attack and stroke. Regular checks and small daily changes make a real difference.", triggers: "Too much salt, low activity, smoking, stress, whānau history.", treatments: "Less salt, more movement, prescribed medication, regular blood pressure checks.", title_mi: "Pēhanga toto tiketike", summary_mi: "Kāore he tohu i te nuinga o te wā, engari ka piki te tūraru manawa.", triggers_mi: "Te tote nui rawa, te kore korikori, te kai paipa, te taumahatanga.", treatments_mi: "He iti ake te tote, he nui ake te korikori, te rongoā kua tohua.", status: "published", sort_order: 3 },
  { title: "Gout", summary: "A painful form of arthritis, often in the big toe. Very common in Aotearoa and very treatable — you don't have to put up with the pain.", triggers: "Some kai and drinks (kaimoana, red meat, beer, sugary drinks), dehydration, whānau history.", treatments: "Daily preventer medicine (allopurinol), pain relief during flares, plenty of water.", title_mi: "Kāuti", summary_mi: "He momo pona mamae, e kitea nuitia ana i Aotearoa, ka taea te rongoā.", triggers_mi: "Ētahi kai me ngā inu, te matewai, te hītori o te whānau.", treatments_mi: "He rongoā ārai ia rā, he rongoā mamae i ngā wā ngau.", status: "published", sort_order: 4 },
]

const whakatauki = [
  { text: "He oranga ngākau, he pikinga waiora.", translation: "Positive feelings in your heart will raise your sense of self-worth.", theme: "Wellbeing", source: "Traditional", status: "published" },
  { text: "Ehara taku toa i te toa takitahi, engari he toa takitini.", translation: "My strength is not that of one, but that of many.", theme: "Community", source: "Traditional", status: "published" },
  { text: "He kai kei aku ringa.", translation: "There is food at the end of my hands — I can use my abilities to thrive.", theme: "Resilience", source: "Traditional", status: "published" },
]

const resources = [
  { title: "Looking after your heart", description: "A plain-language guide to keeping your heart healthy — kai, movement, and knowing your numbers.", title_mi: "Te tiaki i tō manawa", description_mi: "He aratohu reo māmā mō te tiaki i tō manawa.", type: "link", file_path: "https://www.heartfoundation.org.nz", status: "published" },
  { title: "Managing your medicines", description: "How to keep track of what you take, when to take it, and questions to ask your pharmacist.", title_mi: "Te whakahaere i ō rongoā", description_mi: "Me pēhea te aroturuki i ō rongoā me ngā pātai ki tō kaiwhakarite rongoā.", type: "link", file_path: "https://www.healthify.nz", status: "published" },
  { title: "Healthy kai on a budget", description: "Simple, affordable meal ideas for the whole whānau.", title_mi: "He kai hauora, he utu iti", description_mi: "He whakaaro kai māmā, utu iti mō te whānau katoa.", type: "link", file_path: "https://www.healthify.nz", status: "published" },
]

async function main() {
  console.log(`\nSeeding ${base} …\n`)

  // Preflight
  const health = await api("GET", "/health")
  if (health.status !== 200) {
    console.error(`❌ /health returned ${health.status} — is the URL right?`)
    process.exit(1)
  }
  console.log("✅ server healthy")

  // Auth probe: harmless GET against an admin route
  const probe = await api("GET", "/api/admin/conditions")
  if (probe.status === 401) {
    console.error(
      "\n❌ Admin API requires an Auth0 token (got 401).\n" +
      "   Re-run with:  node seed-remote.mjs " + base + " --token <TOKEN>\n" +
      "   (See the header comment for how to copy the token from the\n" +
      "   Kete Admin panel's Network tab.)"
    )
    process.exit(1)
  }
  if (probe.status !== 200) {
    console.error(`❌ Unexpected ${probe.status} from /api/admin/conditions:`, probe.data)
    process.exit(1)
  }
  if (!token) {
    console.log(
      "⚠️  Admin API accepted the request WITHOUT a token — AUTH0_DOMAIN is\n" +
      "    not set on this server, so admin routes are currently open to\n" +
      "    anyone. Fine for a quick seed, but set up Auth0 (AUTH0_SETUP.md)\n" +
      "    before the public can find this URL."
    )
  }

  const existingConditions = (Array.isArray(probe.data) ? probe.data : []).map((c) => c.title)
  let n = 0
  for (const c of conditions) {
    if (existingConditions.includes(c.title)) { console.log(`   skip condition: ${c.title}`); continue }
    const r = await api("POST", "/api/admin/conditions", c)
    console.log(r.status === 200 || r.status === 201 ? `   ✅ condition: ${c.title}` : `   ❌ condition ${c.title}: ${r.status} ${JSON.stringify(r.data).slice(0,120)}`)
    if (r.status < 300) n++
  }

  const wkExisting = await api("GET", "/api/admin/whakatauki")
  const wkTexts = (Array.isArray(wkExisting.data) ? wkExisting.data : []).map((w) => w.text)
  for (const w of whakatauki) {
    if (wkTexts.includes(w.text)) { console.log(`   skip whakataukī: ${w.text.slice(0,30)}…`); continue }
    const r = await api("POST", "/api/admin/whakatauki", w)
    console.log(r.status < 300 ? `   ✅ whakataukī: ${w.text.slice(0,40)}…` : `   ❌ whakataukī: ${r.status} ${JSON.stringify(r.data).slice(0,120)}`)
    if (r.status < 300) n++
  }

  const lrExisting = await api("GET", "/api/admin/learning-resources")
  const lrTitles = (Array.isArray(lrExisting.data) ? lrExisting.data : []).map((x) => x.title)
  for (const l of resources) {
    if (lrTitles.includes(l.title)) { console.log(`   skip resource: ${l.title}`); continue }
    const r = await api("POST", "/api/admin/learning-resources", l)
    console.log(r.status < 300 ? `   ✅ resource: ${l.title}` : `   ❌ resource ${l.title}: ${r.status} ${JSON.stringify(r.data).slice(0,120)}`)
    if (r.status < 300) n++
  }

  // Final proof: what the APP will see
  const check = await api("GET", "/api/app/conditions")
  const count = Array.isArray(check.data) ? check.data.length : 0
  console.log(`\n${count > 0 ? "✅" : "❌"} /api/app/conditions now returns ${count} published condition(s).`)
  const wk = await api("GET", "/api/app/whakatauki")
  console.log(`${(wk.data || []).length > 0 ? "✅" : "❌"} /api/app/whakatauki returns ${(wk.data || []).length}.`)
  console.log(`\nDone — ${n} item(s) created. Refresh the admin panel to see them.`)
}

main().catch((e) => { console.error("Failed:", e.message); process.exit(1) })
