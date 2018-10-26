const path = require('path');

if(!process.env.ENV) {
  throw 'ENV not set.'
}
const watch = process.env.WATCH !== 'false';

module.exports = {
  entry: './source/js/@client/index.tsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },

  watch,

  mode: process.env.ENV === 'production' ? 'production' : 'development',

  devtool: 'source-map',

  resolve: {
    modules: [
      path.resolve('source/js'),
      'node_modules'
    ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@env': path.resolve(__dirname, 'source/js/@env'),
      '@lib': path.resolve(__dirname, 'source/js/@lib'),
      '@client': path.resolve(__dirname, 'source/js/@client'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'string-replace-loader',
        options: {
          search: '@{ENV}',
          replace: process.env.ENV.toLowerCase(),
        }
      },

      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
};