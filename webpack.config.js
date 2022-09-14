var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json"));
var CopyPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    main: `${__dirname}/source/main.tsx`
  },
  output: {
    path: `${__dirname}/docs`,
    filename: "[name].[chunkhash].js"
  },

  devServer: {
    static: {
      directory: `${__dirname}/docs`,
    },
    compress: true,
    watchFiles: `${__dirname}/source`,
    port: 9000,
  },
  devtool: process.env.NODE_ENV ? false : 'inline-source-map',

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Puts CSS into its own file
          {
            loader: "css-loader",
            options: {
              url: false
            } // Translates CSS into CommonJS
          },
          "sass-loader",  // Compiles Sass to CSS
        ]
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css"
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/source/index.ejs`,
      filename: "index.html",
      templateParameters: {
        "version": pkg.version,
        "build_time": new Date().toISOString()
      },
    })
  ]
};