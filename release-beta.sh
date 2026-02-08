#!/bin/bash

# release-beta.sh
# 
# Usage: ./release-beta.sh [API_URL]
# Example: ./release-beta.sh https://kete-server.onrender.com

echo "🚀 Starting Beta Release Build Process..."

# 1. Get API URL
API_URL="$1"

if [[ -z "$API_URL" ]]; then
    echo "⚠️  No API URL provided."
    echo "Please enter the Production API URL (e.g., https://kete-server.onrender.com):"
    read -r OBSERVED_URL
    API_URL="$OBSERVED_URL"
fi

# Remove trailing slash if present
API_URL=${API_URL%/}

if [[ -z "$API_URL" ]]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo "✅ Using API URL: $API_URL"
echo "---------------------------------------------------"
echo "⚠️  IMPORTANT: Ensure you have bumped the version in app.json if this is a new release!"
echo "---------------------------------------------------"

# 2. Confirm
read -p "Type 'yes' to proceed with EAS Build: " CONFIRM
if [[ "$CONFIRM" != "yes" ]]; then
    echo "❌ Build cancelled."
    exit 0
fi

# 3. Build Android APK
echo "📦 Building Android APK (Preview Profile)..."
cd clean/mobile || exit

# Run EAS Build with the environment variable
EXPO_PUBLIC_API_URL="$API_URL" npx eas build -p android --profile preview

echo "🎉 Build command finished!"
echo "Check the link above to download your APK."
