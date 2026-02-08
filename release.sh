#!/bin/bash

# release.sh - Helper to build Android APK with ngrok URL

echo "🚀 Starting Release Build Process..."

# 1. Check for ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok not found. Please install it first."
    exit 1
fi

# 2. Start ngrok in background (if not running) or check for existing tunnel using API
# Note: Since we can't easily parse the ngrok output from background process in script without jq, 
# we ask the user to provide the URL or we try to find it.

echo "🔍 Please ensure 'ngrok http 3000' is running in another terminal."
echo "Paste your ngrok URL below (e.g., https://a1b2.ngrok-free.app):"
read -r NGROK_URL

if [[ -z "$NGROK_URL" ]]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo "✅ Using API URL: $NGROK_URL"

# 3. Build Android APK
echo "📦 Building Android APK..."
cd clean/mobile || exit

# Run EAS Build with the environment variable
EXPO_PUBLIC_API_URL="$NGROK_URL" npx eas build -p android --profile preview

echo "🎉 Build command finished!"
echo "Check the link above to download your APK."
