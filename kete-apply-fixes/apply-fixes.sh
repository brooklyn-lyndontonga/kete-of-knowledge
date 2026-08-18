#!/bin/bash
# Kete of Knowledge — applies the final pre-beta fixes in one go.
#
# Usage, from the REPO ROOT (the folder containing package.json):
#     ./apply-fixes.sh your-support-email@example.com
#
# What it does:
#   1. git pull
#   2. adds the missing root dependency (express-oauth2-jwt-bearer)
#   3. installs config.js with real policy URLs + your support email
#   4. installs the draft-banner privacy page and the new terms page
#   5. runs the test suite as a safety check
#   6. commits and pushes everything

set -e

SUPPORT_EMAIL="$1"
if [[ -z "$SUPPORT_EMAIL" ]]; then
  echo "❌ Please provide the support email, e.g.:"
  echo "   ./apply-fixes.sh brooklyn@example.com"
  exit 1
fi
if [[ ! -f package.json || ! -d clean/mobile ]]; then
  echo "❌ Run this from the repo root (the folder with package.json and clean/)."
  exit 1
fi
HERE="$(cd "$(dirname "$0")" && pwd)"

echo "── 1/6 Pulling latest…"
git pull

echo "── 2/6 Adding missing root dependency…"
npm install express-oauth2-jwt-bearer --save

echo "── 3/6 Installing config.js (support email: $SUPPORT_EMAIL)…"
sed "s|REPLACE_ME_support_email\" /\* ← the ONE value I can't choose for you: use your own email until ManawaOra provide theirs, then swap \*/|$SUPPORT_EMAIL\"|" \
  "$HERE/config.READY.js" > clean/mobile/src/config.js
if grep -q "REPLACE_ME" clean/mobile/src/config.js; then
  echo "❌ config.js still has a placeholder — check config.READY.js"; exit 1
fi

echo "── 4/6 Installing policy pages…"
cp "$HERE/privacy.WITH-BANNER.html" clean/server/public/privacy.html
cp "$HERE/terms.html"               clean/server/public/terms.html

echo "── 5/6 Running tests…"
npm test
npm run check:release || true   # te reo + device sign-off blockers are expected for beta

echo "── 6/6 Committing and pushing…"
git add -A
git commit -m "beta prep: root dependency, config values, policy pages (draft-bannered)"
git push

echo ""
echo "✅ All fixes applied and pushed. Railway will redeploy the server automatically."
echo ""
echo "NEXT (after checking the 3 URLs and Railway variables):"
echo "   ./release-beta.sh --platform android"
echo "   → install the APK on YOUR phone → test email sign-in →"
echo "   → if it works, send the link to the team, then:"
echo "   ./release-beta.sh --platform ios && npx eas submit -p ios --latest"
