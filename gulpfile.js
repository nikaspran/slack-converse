/*eslint no-process-exit:0 */

'use strict';
require('./babel');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');

var bailOnFail = !!process.env.CI;

gulp.task('lint', function () {
  var stream = gulp.src('./{lib,test}/**/*')
    .pipe(eslint())
    .pipe(eslint.format());

  return bailOnFail ? stream.pipe(eslint.failOnError()) : stream;
});

gulp.task('test', function () {
  return gulp.src('./test/**/*', {read: false})
    .pipe(mocha())
    .on('error', function (error) {
      if (bailOnFail) {
        console.error(error.message);
        process.exit(1);
      }
      console.error(error.toString());
      this.emit('end');
    });
});

gulp.task('build', function (done) {
  runSequence(
    'lint',
    'test',
    done
  );
});

gulp.task('watch', function () {
  gulp.watch('./{lib,test}/**/*', ['build']);
});

gulp.task('default', function (done) {
  require('run-sequence')(
    'build',
    'watch',
    done
  );
});