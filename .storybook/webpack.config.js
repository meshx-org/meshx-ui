const path = require('path')

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
   // include: [path.resolve(appDirectory, 'node_modules/react-native-svg')],
    options: {
      presets: [
        'module:metro-react-native-babel-preset',
        '@babel/preset-typescript',
      ],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-svg-web'
      },
    },
  })
  config.resolve.extensions.push('.ts', '.tsx', '.stories.tsx')

  return config
}
