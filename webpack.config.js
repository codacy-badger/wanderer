const path = require("path");

const SRC_DIR = path.join(__dirname, "/src");
const DIST_DIR = path.join(__dirname, "/dist");

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  mode: "development",
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  context: __dirname,
  resolve: {
    extensions: [".js", ".jsx", ".json", "*"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "env", "stage-0"],
          plugins: [
            require("babel-plugin-transform-object-rest-spread"),
            require("babel-plugin-transform-class-properties"),
            require("babel-plugin-transform-decorators"),
            require("babel-plugin-transform-react-constant-elements"),
            require("babel-plugin-transform-react-inline-elements"),
            require("react-hot-loader/babel")
          ]
        }
      },
      {
        test: /\.s?css$/,
        use: ["css-loader", "sass-loader", "style-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
