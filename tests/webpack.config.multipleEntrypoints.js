var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var MiniCssPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: 'production',
  context: __dirname,
  entry: {
    main: './assets/js/index',
    another_entrypoint: "./assets/js/index2",
  },
  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      minSize: 30000,
      chunks: "all",
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single",
  },
  

  plugins: [
    new MiniCssPlugin({filename: '[name].css',     chunkFilename: '[name].css' }),
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      { test: /\.jsx?$/, exclude: /node_modules/, use: [ 'babel-loader'], },
      { test: /\.css$/, use: [MiniCssPlugin.loader, "css-loader"] }
    ],
  },

  resolve: {

    extensions: ['.css', '.js', '.jsx']
  },
}
