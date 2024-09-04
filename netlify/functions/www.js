const express = require("express");
const webpack = require("webpack");
const webpackConfig = require("../../webpack.config");

const compiler = webpack(webpackConfig);

const app = express();

app.use(require("webpack-dev-middleware")(compiler));
app.get('/sitemap', function (req, res) {
    res.render('./sitemap.xml');
})

app.listen(3000, () => console.log("App listening on port 3000!"));
