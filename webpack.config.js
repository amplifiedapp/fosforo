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
        1: {"id": "1", "src": "http://images.celebeat.com/data/images/full/3789/jennifer-aniston-puts-on-weight-for-her-role-in-cake-ib-times.jpg", "fullName": "Jennifer A."},
        2: {"id": "2", "src": "http://www.celebritynetworth.co/wp-content/uploads/2015/08/angelina-jolie-197957_w1000.jpg", "fullName": "Angelina J."},
        3: {"id": "3", "src": "http://i.huffpost.com/gen/1351199/images/o-DEMI-MOORE-2013-facebook.jpg", "fullName": "Demi M."},
        4: {"id": "4", "src": "http://www.theplace2.ru/archive/claire_forlani/img/2006jan2forlani55eb.jpg", "fullName": "Claire F."},
        5: {"id": "5", "src": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Gwyneth_Paltrow_2012.jpg", "fullName": "Gwyneth P."},
        6: {"id": "6", "src": "http://www.dvdsreleasedates.com/pictures/800/12000/Thandie-Newton.jpg", "fullName": "Thandie N."},
        7: {"id": "7", "src": "https://pmcdeadline2.files.wordpress.com/2012/08/ormond__120830221523.jpg", "fullName": "Julia O."},
        8: {"id": "8", "src": "http://lostfilm.info/images/photo_actor/51/583271_507482.jpg", "fullName": "Sonita H."},
        9: {"id": "9", "src": "http://images.mstarz.com/data/images/full/28019/sinitta.jpg", "fullName": "Sinitta"},
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
