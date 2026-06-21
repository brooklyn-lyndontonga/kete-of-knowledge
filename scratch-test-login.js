async function test() {
  try {
    const res = await fetch("https://kete-server-production.up.railway.app/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "maraea@thecentreforhealth.co.nz", password: "@dmin1" })
    });
    console.log("Status:", res.status);
    console.log("Body:", await res.text());
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
test();
