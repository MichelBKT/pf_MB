const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');
const app = express();
const webpackConfig = require('../webpack.config.js');
const path = require("node:path");

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
});