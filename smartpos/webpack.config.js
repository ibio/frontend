const webpack = require('webpack');
const path = require('path');
 
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
      //make sure it can be load by 'jquery'
      jquery$: 'jquery',
    },
    extensions: ['', '.js', '.jsx']
  },
	entry: {
    app: path.resolve('./app') + '/' + 'main.js',
    //for basic stable library only
    vendor: ['babel-polyfill', 'jquery', 'lodash', 'react', 'react-dom', 'bootstrap'],
  },
  output: {path: path.resolve('./script'), publicPath:'script/', filename: 'app.bundle.js'},
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
      }*/
    ]
  },
  plugins: [
  	new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
    //export to global for bootstrap and etc. (needs jquery ^2.0)
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    })
  ]
};