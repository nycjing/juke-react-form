module.exports = {
  entry: './browser/react-app.js',
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  context: __dirname,
  module: {
    loaders: [{
      test: /jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  devtool: 'source-map'
};
