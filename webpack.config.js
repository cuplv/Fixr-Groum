var webpack = require('webpack');  
module.exports = {  
  entry: {
    bundle:"./js/app.js",
    groum:"./js/groum/groum.js"
  },
  output: {
    path: __dirname + '/static',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      }
    ]
  }
};
