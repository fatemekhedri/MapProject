// webpack.config.js

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
  // console.log(`mode is: ${mode}`);
  return {
    mode,
    entry: "./src/index.js",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",

          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.jpe?g|png$/,
          exclude: /node_modules/,
          use: ["url-loader", "file-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(ttf|eot|woff|woff2|ico)$/,
          use: ["file-loader?name=/dist/assets/fonts/[name].[ext]"],
          exclude: path.resolve(__dirname, "./src/assets/images"),
        },
      ],
    },
    resolve: {
      fallback: {
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        path: require.resolve("path-browserify"),
      },
      extensions: ["*", ".js", ".jsx"],

      // alias: {
      //   moment: "moment/moment.js",
      // },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
        favicon: "./public/parsegasht-logo.ico",
      }),
      new NodePolyfillPlugin(),
    ],
  };
};
