var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('dev:scripts', () => {
    return gulp
        .src('./src/scripts/**/*.js')
        .pipe($.babel())
        .pipe(gulp.dest('./public/scripts'))
});


gulp.task('dev:styles', () => {
    return gulp
        .src('./src/styles/main.less')
        .pipe($.less())
        .pipe(gulp.dest('./public/styles'))
});

gulp.task('dev', gulp.parallel('dev:scripts', 'dev:styles'));

gulp.task('watch', gulp.series(
    'dev',
    () => {
        gulp.watch('./src/styles/**/*.{less,css}', gulp.series('dev:styles'));
        gulp.watch('./src/scripts/**/*.js', gulp.series('dev:scripts'));
    }
));