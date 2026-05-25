#!/bin/bash

# clean-image-names.sh
# 
# A helper script to verify all image assets are clean and correctly referenced, 
# clear Metro/Expo caches, and resolve the "UnableToResolveError" / "Asset not found" errors.

echo "🌿 Kete of Knowledge - Expo/Metro Cache Cleaner & Asset Verifier"
echo "=================================================================="

# 1. Run static checks to ensure no old asset names remain in code
echo "🔍 Checking for stale image references in source code..."
OLD_REFERENCES=$(grep -rnw "clean/mobile/src" -e "kawakawa_enhanced" -e "unsplash_enhanced" -e "kauriForest" -e "sandRipples" -e "kawakawaBrief" 2>/dev/null)

if [ -n "$OLD_REFERENCES" ]; then
    echo "⚠️  Found potential stale references in the following files:"
    echo "$OLD_REFERENCES"
    echo "Please verify if these need to be updated to the new naming convention."
else
    echo "✅ No stale image references found in clean/mobile/src! The codebase is clean."
fi

echo "------------------------------------------------------------------"

# 2. Stop any running Metro servers on the default React Native port (8081)
echo "🔌 Detecting running Metro bundler on port 8081..."
METRO_PID=$(lsof -t -i:8081 2>/dev/null)

if [ -n "$METRO_PID" ]; then
    echo "🔥 Found active Metro server running on PID: $METRO_PID. Terminating..."
    kill -9 $METRO_PID 2>/dev/null
    echo "✅ Stopped running Metro bundler."
else
    echo "✅ No active Metro server found on port 8081."
fi

# 3. Clear Expo and Metro Cache directories
echo "🧹 Clearing Expo & Metro bundler caches..."
if [ -d "clean/mobile/.expo" ]; then
    rm -rf clean/mobile/.expo
    echo "🗑️  Removed clean/mobile/.expo folder."
fi

# Clear watchman watch lists
if command -v watchman &> /dev/null; then
    echo "👁️  Resetting Watchman file watches..."
    watchman watch-del-all &>/dev/null
    echo "✅ Watchman cache cleared."
fi

# 4. Restarting Expo server with clean option
echo "------------------------------------------------------------------"
echo "🎉 Cache cleanup complete!"
echo "To restart your development server with a fully cleared cache, run:"
echo ""
echo "    cd clean/mobile && npx expo start --clear"
echo ""
echo "Would you like to run the clear and start command now? (y/n)"
read -r RUN_START

if [[ "$RUN_START" =~ ^[Yy]$ ]]; then
    echo "🚀 Starting Expo with cleared cache..."
    cd clean/mobile && npx expo start --clear
else
    echo "👍 Sounds good! You can manually start Expo whenever you're ready."
fi
