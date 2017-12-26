const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: __dirname + './src/main.js',
    vendor: ['vue','vue-router','axios'],
    plugin: ['vue-ydui']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'assets/[name]-[hash].js'
  },

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
