var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stream = require('stream'),
    sourceStream = require('vinyl-source-stream');

var through2 = require('through2');

function createEmptyStream() {
    var pass = through2.obj();
    process.nextTick(pass.end.bind(pass));
    return pass;
}

const config = {
    scripts: {
        prod: {
            src: ['./public/scripts/app.js', './public/scripts/problem.js', '!./public/scripts/_*.js'],
            dest: './public/build',
            require: {
                mainConfigFile: './public/config.js'
            },
            vendor: ['jquery', 'jquery-ui', 'lodash']
        }
    }
};

gulp.task('dev:scripts', () => {
    return gulp
        .src(['./src/scripts/**/*.js', '!./src/scripts/_*.js'])
        .pipe($.babel())
        .pipe(gulp.dest('./public/scripts'))
});

gulp.task('prod:scripts', gulp.series(
    'dev:scripts',
    gulp.parallel(
        function vendorBoundle(){
            const prodCfg = config.scripts.prod;
            //return new stream.Readable({
            //    objectMode: true,
            //    read: function (file, enc, next) {
            //        this.push(null);
            //    }
            //})
            gulp.src('./src/scripts/_vendors.js')
                //.pipe(sourceStream('vendors.js'))
                .pipe($.requirejsOptimize({
                    mainConfigFile: prodCfg.require.mainConfigFile,
                    include: prodCfg.vendor,
                    baseUrl: './public/scripts' // BARDZO WAZNE - bez tego bedzie szukalo plikow w src a nie public
                }))
                .pipe(gulp.dest(prodCfg.dest));
        },
        function appBundle() {
            return gulp
                .src(config.scripts.prod.src)
                .pipe($.requirejsOptimize({
                        mainConfigFile: config.scripts.prod.require.mainConfigFile,
                        exclude: config.scripts.prod.vendor
                    }
                ))
                .pipe(gulp.dest(config.scripts.prod.dest));
        }
    )
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