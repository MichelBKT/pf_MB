"use strict";

var express = require("express");
var webpack = require("webpack");
var webpackConfig = require("../../webpack.config");
var compiler = webpack(webpackConfig);
var app = express();
app.use(require("webpack-dev-middleware")(compiler));
app.listen(3000, function () {
  return console.log("App listening on port 3000!");
});
//# sourceMappingURL=www.js.map