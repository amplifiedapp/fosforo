var webpack = require('webpack');

var config = {
  entry: {
    app: './src/index2'
  },
  output: {
    filename: '[name].js',
    path: 'dist',
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
};

module.exports = config;
