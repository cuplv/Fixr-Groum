var webpack = require('webpack');  
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {  
  entry: {
    bundle:"./js/app.js",
    groum:"./js/groum/groum.js"
  },
  output: {
    path: __dirname + '/static',
    filename: "[name].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('develop')
      }
    }),
    new CopyWebpackPlugin([{from : 'imgs', to : 'imgs'}])
  ],
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
