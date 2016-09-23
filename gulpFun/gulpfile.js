var gulp = require('gulp'),
//GULP_LOAD_PLUGINS wykrywa uzywane pluginy i ładuje je za nas - musimy tylko odnosic sie do nich przez utworzona zmienna
// !!! nazwy bez przedrostka 'gulp-' !!!!!
    $plugins = require('gulp-load-plugins')();

const config = {
    styles: {
        src: './src/styles/main.less',
        dest: './public/styles',
        prefix: {
            browsers: ['last 5 versions']
        },
        srcDir: './src/styles/**/*.{less,css}'
    },
    scripts: {
        src: './src/scripts/**/*.js',
        dest: './public/scripts',
        bundle: 'main.js'
    },
    html: {
        src: './public/**/*.html'
    }
};

//    babel = require('gulp-babel'),
//    less = require('gulp-less'),
//    sourcemaps = require('gulp-sourcemaps'),
//    autoprefixer = require('gulp-autoprefixer');

// Kazda funkcja gulpa musi zwracac stream

// Jesli ktorakolwiek tego nie robi to mozna jako pierwszy parametr uzyc callback i wywolac go w odpowiednim momencie
// uzywam es2k15 bo node rozumie
gulp.task('cb_sample', (cb) => {
    console.log('task zaczety');

    setTimeout(() => {
        console.log('task skonczony gdyby nie bylo callbacka w parametrach wywalil by blad');
        cb();
    }, 2000);
});


// wykonuje zadania pokolei jedno po drugim
//gulp.task('default', gulp.series([stub, devStyles, devScripts]));

//wykonuje zadania naraz rownolegle
//gulp.task('default', gulp.parallel([stub, devStyles, devScripts]));


gulp.task('stub', stub);

gulp.task('dev:styles', processStyles(config.styles, false));

gulp.task('prod:styles', processStyles(config.styles, true));

gulp.task('dev:scripts', devScripts(config.scripts));

gulp.task('prod:scripts', prodScripts(config.scripts));

gulp.task('html', html);

gulp.task('prod', (gulp.parallel('prod:styles', 'prod:scripts')));

gulp.task('dev', (gulp.parallel('dev:styles', 'dev:scripts')));

gulp.task('watch', gulp.series('dev', devWatch));

// JESLI CHCEMY UZYC NAZWY DO WYWOLANIA TO TASK MUSI BYC ZDEFINIOWANY PRZED UZYCIEM!!!!!!!!!!!!!!!!!!!!!!!
//mozna mieszac
gulp.task('default', gulp.series(
    [
        stub,
        gulp.parallel( //[] sa opcjonalne
            "dev:styles",
            devScripts(config.scripts),
            (cb) => {
                console.log('jeszcze 1');
                cb();
            }), //funkcje anonimowe tez sa ok
        ending
    ]));


//hoisting
function stub(cb) {
    setTimeout(() => {
        console.log('start stub');
        cb()
    }, 1000);
}

function devScripts(cfg) {
    return () => {
        console.log('start scripts');
        return gulp
        //.src(['./src/scripts/app.js', './src/scripts/sth.js'])
            .src(cfg.src)
            .pipe($plugins.sourcemaps.init())
            .pipe($plugins.babel())
            .pipe($plugins.sourcemaps.write('.')) //kropka oznacza external sourcemape - podaje sie sciezke do zapisu
            .pipe(gulp.dest(cfg.dest))
            .pipe($plugins.livereload());
    }
}

function processStyles(cfg, isProduction) {
    return () => {
        console.log('start styles');
        return gulp
            .src(cfg.src)
            .pipe($plugins.if(!isProduction, $plugins.sourcemaps.init())) // jesli warunek nie spelniony - pomija
            .pipe($plugins.autoprefixer(cfg.prefix))
            .pipe($plugins.less())
            .pipe($plugins.if(isProduction, $plugins.cleanCss()))
            .pipe($plugins.if(!isProduction, $plugins.sourcemaps.write())) // bez argumentow - tworzy mape w pliku (INTERNAL)
            .pipe(gulp.dest(cfg.dest))
            .pipe($plugins.if(!isProduction, $plugins.livereload()));
    }
}

function ending(cb) {
    console.log('just sth left for the end');
    cb();
}

function prodScripts(cfg) {
    return () => {
        return gulp
            .src(cfg.src)
            .pipe($plugins.babel())
            .pipe($plugins.concat(cfg.bundle)) //nazwa pliku wyjsciowego jako argument
            .pipe($plugins.uglify())
            .pipe(gulp.dest(cfg.dest));
    }
}

function devWatch() {
    $plugins.livereload.listen();
    gulp.watch(config.styles.srcDir, gulp.series('dev:styles'));
    gulp.watch(config.scripts.src, gulp.series('dev:scripts'));
    gulp.watch(config.scripts.src, gulp.series('dev:scripts'));
    gulp.watch(config.html.src, gulp.series('html'));
}

function html(){
    console.log('HTML');
    gulp.src(config.html.src)
        .pipe($plugins.livereload())
}