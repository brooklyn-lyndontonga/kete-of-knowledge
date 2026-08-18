# Hotfix: sign-in 500 (P2023) + SMTP ENETUNREACH

Two files, both drop-in replacements:

  db-index.FIXED.js      →  clean/server/db/index.js
  server-index.FIXED.js  →  clean/server/index.js

Then:
  git add clean/server/db/index.js clean/server/index.js
  git commit -m "fix: rebuild legacy token tables as BIGINT; prefer IPv4 for SMTP"
  git push

Railway redeploys automatically. In the new deploy's logs you should see:
  🔧 Rebuilt magic_link_tokens with BIGINT expiresAt (legacy schema fix)
  🔧 Rebuilt admin_password_resets with BIGINT expiresAt (legacy schema fix)
  📧 SMTP ready        ← the IPv4 fix should turn this green

Then re-run the test:
  curl -X POST https://kete-server-production.up.railway.app/api/app/auth/magic-link \
    -H "Content-Type: application/json" -d '{"email":"haeatamedia@gmail.com"}'

Expected: {"ok":true,"message":"Magic link sent"} and an email in the inbox.
(If NODE_OPTIONS=--dns-result-order=ipv4first was added as a Railway variable
earlier, it can stay — it's harmless alongside the code fix, or delete it.)
