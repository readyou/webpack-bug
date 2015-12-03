import path from "path";
import shell from "shelljs";

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
  }],
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    noParse: [path.join(process.cwd(), 'assets/js/common/button.js')],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },
};
