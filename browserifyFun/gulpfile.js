var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserifyCss = require('browserify-css');

gulp.task('dev:scripts', () => {
    const bundler = browserify('./src/scripts/app.js', {  // wybieramy glowne zrodlo
        debug: true
    });

    bundler.transform(babelify);

    bundler.transform(browserifyCss, {
        global: true, //defniuje ze powinien szukac w kontekscie globalnym
        rootDir: 'public',
        processRelativeUrl: function(relativePath) {
            console.log(relativePath);
            return relativePath;
        }
    });

    return bundler.bundle() // node stream
        .pipe(source('bundle.js'))
        .pipe(buffer()) // opcjonalne - potrzebujemy tego by uzywac innych pluginow gulpa, jesli nie chcemy nie trza
            // niektore gulpowe pluginy wspieraja streamowanie plikow vinylfs (utworzony w source) bez ich buferowania
        .pipe(gulp.dest('./public/scripts'));
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