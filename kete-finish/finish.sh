#!/bin/bash
# Final step: switch email to Brevo HTTPS. Run from the repo root:
#     ./finish.sh
set -e
if [[ ! -d clean/server/services ]]; then
  echo "❌ Run this from the repo root (folder containing clean/)"; exit 1
fi
HERE="$(cd "$(dirname "$0")" && pwd)"
git pull
cp "$HERE/email.BREVO.js" clean/server/services/email.js
node --check clean/server/services/email.js
git add clean/server/services/email.js
git commit -m "feat: email via Brevo HTTPS API (Railway blocks SMTP on this plan)"
git push
echo ""
echo "✅ Pushed. Railway is redeploying now (~2 min)."
echo ""
echo "YOUR 3 REMAINING CLICKS:"
echo "1. Railway → kete-server → Variables → add:"
echo "     BREVO_API_KEY    = xkeysib-...(from Brevo → SMTP & API → API Keys)"
echo "     BREVO_FROM_EMAIL = developer@haeatamedia.nz"
echo "2. Brevo → Senders: developer@haeatamedia.nz must say VERIFIED"
echo "   (click the link in the email Brevo sent to that address)"
echo "3. After redeploy, test:"
echo '     curl -X POST https://kete-server-production.up.railway.app/api/app/auth/magic-link -H "Content-Type: application/json" -d '"'"'{"email":"brooklynlt24@gmail.com"}'"'"''
echo "   Then check the brooklynlt24 inbox (and spam)."
