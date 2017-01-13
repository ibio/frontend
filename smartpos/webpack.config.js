const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
 
module.exports = {
	watch: true,
  inline: true,
  resolve: {
    //http://webpack.github.io/docs/configuration.html#resolve-root
    root: [
      path.resolve('./app')
    ],
    //http://webpack.github.io/docs/configuration.html#resolve-alias
    alias: {
      lib: path.resolve('./lib'),
      res: path.resolve('./res'),
      style: path.resolve('./style'),
      //make sure it can be load by 'jquery'
      jquery$: 'jquery',
    },
    extensions: ['', '.js', '.jsx']
  },
	entry: {
    // entry points
    app: path.resolve('./app') + '/' + 'main.js',
    // NOTICE: this is just a sample for multiple entry points
    other: path.resolve('./app') + '/' + 'other.js',
    //for basic stable library only
    vendor: ['babel-polyfill', 'jquery', 'lodash', 'react', 'react-dom', 'bootstrap-sass', path.resolve('./app') + '/' + 'vendor.js'],
  },
  output: {path: path.resolve('./script'), publicPath:'script/', filename: '[name].js', /*chunkFilename: "[id].js"*/},
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      /*
      {
      	test: /\.css$/, 
      	loaders: ["style", "css"]
      },*/
      {
        // test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        // loader: "file"
        // https://github.com/webpack/webpack/issues/597
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.scss$/,
        // https://css-tricks.com/css-modules-part-2-getting-started/
        // css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!sass?sourceMap")
      }
    ]
  },
  sassLoader: {
    // for @import path in the style file
    includePaths: [path.resolve('./style') + '/']
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    //export to global for bootstrap and etc. (needs jquery ^2.0)
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    }),
    // http://webpack.github.io/docs/stylesheets.html
    new ExtractTextPlugin("[name].css")
  ]
};