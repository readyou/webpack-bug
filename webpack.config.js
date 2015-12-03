import path from "path";
import shell from "shelljs";
import HtmlWebpackPlugin from "html-webpack-plugin";

const ASSETS = 'assets';
const ASSETS_PATH = path.join(shell.pwd(), ASSETS);

const FILENAMES = {
  btnLib: 'button',
  bundle: 'bundle'
};

export
default {
  entry: {
    entry1: ['./src/js/index.js']
  },
  output: {
    path: path.join(ASSETS_PATH, 'js'),
    filename: FILENAMES.bundle + '.[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};
