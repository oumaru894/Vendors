module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins:[
      //required for expo-router
      'react-native-reanimated/plugin',
    ],
  };
};
