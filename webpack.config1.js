import path from "path";
import shell from "shelljs";

const ASSETS = 'assets';
const ASSETS_PATH = path.join(shell.pwd(), ASSETS);

const FILENAMES = {
  btnLib: 'button',
  bundle: 'bundle'
};
module.exports = {
  entry: {
    entry1: ['./src/js/Button/index.js']
  },
  output: {
    path: path.join(ASSETS_PATH, 'js'),
    filename: FILENAMES.bundle + '.[hash:8].js',
    publicPath: '/',
    libraryTarget: "umd",
    library: "MyButton"
  },
  externals: [{
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }, {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }, {
      'react-bootstrap': {
        root: 'ReactBootstrap',
        commonjs2: 'react-bootstrap',
        commonjs: 'react-bootstrap',
        amd: 'react-bootstrap'
      }
    }],
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },
};
