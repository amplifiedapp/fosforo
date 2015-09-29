var webpack = require('webpack');

var config = {
  entry: {
    app: './src/index'
  },
  output: {
    filename: '[name].js',
    path: 'dist',
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
      "PROSPECT_DATA": JSON.stringify({
        1: {"id": "1", "src": "src/assets/images/p1.jpg", "fullName": "Jennifer A."},
        2: {"id": "2", "src": "src/assets/images/p10.jpg", "fullName": "Angelina J."},
        3: {"id": "3", "src": "src/assets/images/p3.jpg", "fullName": "Demi M."},
        4: {"id": "4", "src": "src/assets/images/p4.jpg", "fullName": "Claire F."},
        5: {"id": "5", "src": "src/assets/images/p5.jpg", "fullName": "Gwyneth P."},
        6: {"id": "6", "src": "src/assets/images/p6.jpg", "fullName": "Thandie N."},
        7: {"id": "7", "src": "src/assets/images/p7.jpg", "fullName": "Julia O."},
        8: {"id": "8", "src": "src/assets/images/p8.jpg", "fullName": "Sonita H."},
        9: {"id": "9", "src": "src/assets/images/p9.jpg", "fullName": "Sinitta"},
      })
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
};

module.exports = config;
