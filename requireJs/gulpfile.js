var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

const config = {
    scripts: {
        prod: {
            src: ['./public/scripts/app.js', './public/scripts/problem.js'],
            dest: './public/build',
            require: {
                mainConfigFile: './public/config.js'
            }
        }
    }
};

gulp.task('dev:scripts', () => {
    return gulp
        .src('./src/scripts/**/*.js')
        .pipe($.babel())
        .pipe(gulp.dest('./public/scripts'))
});

gulp.task('prod:scripts', gulp.series(
    'dev:scripts',
    function bundle() {
        return gulp
            .src(config.scripts.prod.src)
            .pipe($.requirejsOptimize(config.scripts.prod.require))
            .pipe(gulp.dest(config.scripts.prod.dest));
    }
));

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