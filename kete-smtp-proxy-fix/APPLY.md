# Fix round 2: SMTP IPv6 + rate-limiter proxy warning

Drop-in replacements:
  server-index.FIXED2.js → clean/server/index.js     (adds trust proxy; keeps seed + earlier fixes)
  email.FIXED.js         → clean/server/services/email.js  (connects to Gmail via explicit IPv4)

Then: git add -A && git commit -m "fix: trust Railway proxy; SMTP via explicit IPv4" && git push

In the new deploy logs expect:
  📧 SMTP using IPv4 <some address> for smtp.gmail.com
  📧 SMTP ready
  (and NO more X-Forwarded-For error)

Then re-run the curl and check the inbox (and spam).
