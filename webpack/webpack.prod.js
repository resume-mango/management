/* eslint-disable no-undef */
const Dotenv = require("dotenv-webpack")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const SentryWebpackPlugin = require("@sentry/webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
  mode: "production",
  devtool: "source-map",
  stats: {
    assets: true,
    chunks: true,
    modules: true,
  },
  optimization: {
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        parallel: true,
        terserOptions: {
          sourceMap: {
            file: "[name].map",
          },
        },
      }),
    ],
  },
  plugins: [
    new Dotenv({
      path: "./.env.production",
    }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.info(
        `\u001b[A\u001b[K\u001b[33m${(percentage * 100).toFixed(2)}%` +
          `\t\u001b[0m\u001b[1m${message}\t` +
          `\u001b[0m\u001b[90m${
            args && args.length > 0 ? args[0] : ""
          }\u001b[0m`
      )
    }),
    new CleanWebpackPlugin(),
    new SentryWebpackPlugin({
      org: "careermango",
      project: "management-dashboard",

      // Specify the directory containing build artifacts
      include: "./build",

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and needs the `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN,

      // Optionally uncomment the line below to override automatic release name detection
      // release: process.env.RELEASE,
    }),

    new BundleAnalyzerPlugin({ analyzerMode: process.env.STATS || "disabled" }),
  ],
}
