const gulp = require('gulp');
const ava = require('gulp-ava');
const xo = require('gulp-xo');

gulp.task('test', () =>
	gulp.src('test/test*.js')
		// gulp-ava needs filepaths so you can't have any plugins before it
		.pipe(ava())
);

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'lib/**/*.js'])
    .pipe(xo())
);

gulp.task('default', ['lint', 'test']);
