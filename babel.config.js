module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "module:react-native-dotenv",
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@lib": "./src/lib",
            "@constants": "./src/constants",
            "@assets": "./assets",
            "@store": "./src/zustand",
          },
        },
      ],
    ],
  };
};
