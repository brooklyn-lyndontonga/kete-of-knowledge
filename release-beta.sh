#!/bin/bash

# release-beta.sh
# 
# Usage: ./release-beta.sh [API_URL] [--platform android|ios|all]
# Example: ./release-beta.sh https://kete-server.onrender.com --platform ios

echo "🚀 Starting Beta Release Build Process..."

# 1. Parse args
API_URL=""
PLATFORM="all"

while [[ $# -gt 0 ]]; do
    case "$1" in
        --platform|-p)
            PLATFORM="$2"
            shift 2
            ;;
        --api)
            API_URL="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: ./release-beta.sh [API_URL] [--platform android|ios|all]"
            exit 0
            ;;
        *)
            if [[ -z "$API_URL" ]]; then
                API_URL="$1"
            else
                echo "⚠️  Unknown argument: $1"
            fi
            shift
            ;;
    esac
done

case "$PLATFORM" in
    android|ios|all) ;;
    *)
        echo "❌ Invalid platform: $PLATFORM (use android, ios, or all)"
        exit 1
        ;;
esac

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
echo "⚠️  IMPORTANT:"
echo "   - iOS/TestFlight requires incrementing ios.buildNumber in clean/mobile/app.json"
echo "   - Android APKs can be reinstalled, but consider bumping android.versionCode for clarity"
echo "---------------------------------------------------"

# 2. Confirm
read -p "Type 'yes' to proceed with EAS Build: " CONFIRM
if [[ "$CONFIRM" != "yes" ]]; then
    echo "❌ Build cancelled."
    exit 0
fi

# 3. Build
cd clean/mobile || exit

build_android() {
    echo "📦 Building Android APK (beta-android profile)..."
    EXPO_PUBLIC_API_URL="$API_URL" npx eas build -p android --profile beta-android
}

build_ios() {
    echo "📦 Building iOS IPA (beta-ios profile)..."
    EXPO_PUBLIC_API_URL="$API_URL" npx eas build -p ios --profile beta-ios
}

if [[ "$PLATFORM" == "android" ]]; then
    build_android
elif [[ "$PLATFORM" == "ios" ]]; then
    build_ios
else
    build_android
    build_ios
fi

echo "🎉 Build command finished!"
echo "Check the links above to download your builds."
