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

gulp.task('clean', function(cb) {
  return del([ASSETS_PATH], function() {
    return cb();
  });
});

// gulp.task('run', ['genHtmlFile'], function(cb) {
gulp.task('run', function(cb) {
  let config = _.assign({}, webpackconfig);
  let compiler = webpack(config);
  new WebpackDevServer(compiler, {
    contentBase: ASSETS_PATH,
  }).listen(8080, "localhost", function(e) {});
});

gulp.task('default', function(cb) {
  runSequence('clean', 'run');
});
