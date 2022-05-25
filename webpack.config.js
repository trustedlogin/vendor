const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const isProduction = "production" === process.env.NODE_ENV;

let entry = {};
let entryPoint = "trustedlogin-settings";
entry[`admin-page-${entryPoint}`] = path.resolve(
  process.cwd(),
  `src/${entryPoint}/index.js`
);

module.exports = {
  mode: isProduction ? "production" : "development",
  ...defaultConfig,
  module: {
    ...defaultConfig.module,
    rules: [...defaultConfig.module.rules],
  },
  entry,
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./wpbuild"),
  },
};
