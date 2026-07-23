const colors = {
  olive:"#4A5E4E", laurel:"#8FA38F", cornsilk:"#F6F5F0", meringue:"#EAE8DF",
  camel:"#7E6D5D", orange:"#A5673E", russet:"#7A624E", text:"#2D362E",
  muted:"#616B62", border:"#E2E0D5", card:"#FFFFFF", surface:"#EFEFEA", white:"#FFFFFF",
}
const lin = c => { c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4) }
const lum = hex => {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16)
  return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
}
const ratio = (a,b) => { const l1=lum(a),l2=lum(b); return ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)) }

// Foreground/background pairs actually used in the app
const pairs = [
  ["body text on page",        "text","cornsilk"],
  ["muted caption on page",    "muted","cornsilk"],
  ["muted caption on card",    "muted","card"],
  ["body text on card",        "text","card"],
  ["olive heading on page",    "olive","cornsilk"],
  ["olive label on card",      "olive","card"],
  ["russet chip text",         "russet","surface"],
  ["cornsilk on olive button", "cornsilk","olive"],
  ["white on orange (111 bar)","white","orange"],
  ["camel fallback note",      "camel","card"],
  ["muted on surface",         "muted","surface"],
  ["muted on meringue",        "muted","meringue"],
]

console.log("WCAG AA needs 4.5:1 for body text, 3:1 for large text (18pt+/14pt bold)\n")
let fails = []
for (const [name, fg, bg] of pairs) {
  const r = ratio(colors[fg], colors[bg])
  const aa = r >= 4.5 ? "PASS" : r >= 3 ? "large-only" : "FAIL"
  if (aa !== "PASS") fails.push([name, fg, bg, r.toFixed(2), aa])
  console.log(`${aa.padEnd(11)} ${r.toFixed(2).padStart(5)}:1   ${name}  (${colors[fg]} on ${colors[bg]})`)
}
console.log(`\n${fails.length} pair(s) below AA body-text threshold.`)
