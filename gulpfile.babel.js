'use stirct';

import gulp from "gulp";
import gutil from "gulp-util";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import del from "del";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import fs from "fs";
import shell from "shelljs";
import _ from "lodash";
import runSequence from "run-sequence";
import webpackconfig from "./webpack.config.js";

const ASSETS = 'assets';
const ASSETS_PATH = path.join(shell.pwd(), ASSETS);

const FILENAMES = {
  btnLib: 'button',
  bundle: 'bundle'
};

function genHtmlFile(config) {
  config = _.merge({
    js: {
      orders: [],
      path: './js'
    },
    css: {
      orders: [],
      path: './css'
    },
    path: '.',
    publicPath: '/'
  }, config);
  if (!config.template) {
    let getAssetPath = (file) => {
      return path.normalize(path.join(config.publicPath, path.relative(config.path, file)));
    }
    var links = '';
    var scripts = '';
    // console.log(JSON.stringify(config));
    let cssFiles = shell.find(path.resolve(config.path, config.css.path));
    let jsFiles = shell.find(path.resolve(config.path, config.js.path));

    config.css.orders.forEach((v) => {
      cssFiles.forEach((file) => {
        let reg = new RegExp('\/' + v + '\\..*css$');
        // console.log(file + ': ' + reg.toString());
        if (reg.test(file)) {
          let relPath = getAssetPath(file);
          links += '<link rel="stylesheet" href="' + relPath + '">';
          // console.log('[inject css]: ' + relPath);
        }
      })
    });
    config.js.orders.forEach((v) => {
      jsFiles.forEach((file) => {
        let reg = new RegExp('\/' + v + '\\..*js$');
        // console.log(file + ': ' + reg.toString());
        if (reg.test(file)) {
          let relPath = getAssetPath(file);
          scripts += '<script type="text/javascript" src="' + relPath + '"></script>';
          // console.log('[inject js]: ' + relPath);
        }
      })
    });
    fs.writeFile(path.join(config.path, 'index.html'),
      `<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
    <title>${config.title}</title>
    ${links}
</head>
<body>
    <div id="main"></div>
    ${scripts}
</body>
</html>`);
  } else {
    throw new Error('not completed!');
  }
}

const tasks = {
  clean: 'clean',
  copy: 'copy-common-files',
  build: 'build',
  genHtmlFile: 'genHtmlFile',
  run: 'run'
};

gulp.task('clean', function(cb) {
  return del([ASSETS_PATH], function() {
    return cb();
  });
});

// gulp.task('copy-common-files', ['clean'], function(cb) {
gulp.task('copy-common-files', function(cb) {
  gulp.src(['./src/js/common/**/*'])
    .pipe(gulp.dest(path.join(ASSETS_PATH, 'js/common/')));
  gulp.src(['./src/css/common/**/*'])
    .pipe(gulp.dest(path.join(ASSETS_PATH, 'css/common/')));

  return cb();
});

gulp.task('build', function(cb) {
  let config = _.assign({}, webpackconfig);
  // config.externals = [];
  webpack(config, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log("[build]", stats.toString());
    cb();
  });
});

// gulp.task('genHtmlFile', ['build'], function(cb) {
gulp.task('genHtmlFile', function(cb) {
  genHtmlFile({
    path: ASSETS_PATH,
    js: {
      orders: ['react', 'react-dom', 'libs', 'react-bootstrap', FILENAMES.btnLib, FILENAMES.bundle]
    },
    css: {
      orders: ['bootstrap']
    }
  });
  return cb();
});


// gulp.task('run', ['genHtmlFile'], function(cb) {
gulp.task('run', function(cb) {
  let config = _.assign({}, webpackconfig);
  // console.log(JSON.stringify(config));
  config.entry.entry1.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
  let compiler = webpack(config);
  new WebpackDevServer(compiler, {
    contentBase: ASSETS_PATH,
    publicPath: '/'
  }).listen(8080, "localhost", function(e) {});
});

gulp.task('default', function(cb) {
  runSequence(tasks.clean, tasks.copy, tasks.build, tasks.genHtmlFile, tasks.run);
});
