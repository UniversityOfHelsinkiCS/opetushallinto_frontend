const path = require('path')
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: './app.js'
  },
  devServer: {
    port: 8000,
    contentBase: 'dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }      
    ]
  },
  plugins: [
    new ExtendedDefinePlugin({ TOKEN: process.env.KURKITOKEN })
  ]
}
