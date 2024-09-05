"use strict";

var CopyPlugin = require("copy-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
var path = require('path');
var ASSET_PATH = process.env.ASSET_PATH || '/';
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'production',
  entry: {
    main: ['webpack-hot-middleware/client', './public/javascripts/index.js']
  },
  module: {
    rules: [{
      test: /\.(js|cjs|mjs|ts)$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'public'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
            targets: "defaults"
          }]]
        }
      }
    }, {
      test: /\.(css)$/,
      exclude: /node_modules/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|pdf)$/i,
      type: 'asset/resource'
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin({
      minimizerOptions: {
        preset: ["default", {
          discardComments: {
            removeAll: true
          }
        }],
        minimize: true,
        minimizer: [new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.cleanCssMinify
        })]
      }
    })]
  },
  resolve: {
    extensions: ['.*', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ASSET_PATH
  },
  devServer: {
    "static": {
      directory: path.join(__dirname, './dist')
    },
    compress: true,
    port: 8080
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map',
  plugins: [new CopyPlugin({
    patterns: [{
      from: "./public/images",
      to: "./images/[path][name].[ext]"
    }, {
      from: "./public/fonts",
      to: "./fonts/[path][name][ext]"
    }, {
      from: "./public/documents",
      to: "./documents/[path][name].[ext]"
    }, {
      from: "./public/sitemap.xml",
      to: "./[path][name].[ext]"
    }, {
      from: "./public/robots.txt",
      to: "./[path][name].[ext]"
    }]
  }), new MiniCssExtractPlugin({
    filename: 'style.css'
  }), new webpack.DefinePlugin({
    'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
  }), new webpack.EnvironmentPlugin({
    NODE_ENV: 'production',
    // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: false
  }), new HtmlWebpackPlugin({
    template: 'public/index.html',
    files: {
      css: "style.css",
      js: "bundle.js"
    }
  }), new webpack.HotModuleReplacementPlugin()]
};
//# sourceMappingURL=webpack.config.js.map