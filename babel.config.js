module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@components": "./src/components/",
          "@src": "./src",
        },
        extensions: [".js", ".jsx", ".ios.js", ".android.js", ".ios.jsx", ".android.jsx", ".json"],
        transformFunctions: [
          "require",
          "require.resolve",
          "System.import",
          "jest.genMockFromModule",
          "jest.mock",
          "jest.unmock",
          "jest.doMock",
          "jest.dontMock"
        ],
      },
    ],
    'react-native-paper/babel',
  ],
}
