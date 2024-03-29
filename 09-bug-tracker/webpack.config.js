const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const process = require("process");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function (env) {
  return {
    entry: "./src/index.js",
    module: {
      rules: [
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.(js)$/, use: "babel-loader" },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.[contenthash].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
      new CleanWebpackPlugin(),
    ],
    mode: env.production ? "production" : "development",
  };
};
