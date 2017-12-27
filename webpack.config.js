const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js',
    vendor: ['vue', 'vue-router', 'axios']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'assets/[name]-[hash].js',
    chunkFilename: 'assets/[id].[chunkhash].js'  //异步加载的文件
  },

  module: {
    rules: [
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
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?minimize!postcss-loader!sass-loader',
          fallback: 'style-loader'
        })
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'style-[contenthash].css',
      allChunks: true,
      disable: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename:"assets/vendor.js",
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  )
}
