module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        root: ["./src"],
        alias: {
          "@app": "./src/app",
          "@features": "./src/features",
          "@ui": "./src/ui",
          "@lib": "./src/lib"
        }
      }]
      // If you add Reanimated later, append: 'react-native-reanimated/plugin'
    ]
  }
}
