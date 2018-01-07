const path = require('path')
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
    chunkFilename: 'assets/[id].[chunkhash].js'
  },

  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
	    {
        test: /\.(png|gif|jpe?g)$/, loader: 'url-loader',
        options: { limit: 10000, name: 'assets/[name]?[hash:8].[ext]' }
	    },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?minimize!postcss-loader!sass-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      mods: path.resolve(__dirname, 'src/mods')
    }
  },

  plugins: [
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
