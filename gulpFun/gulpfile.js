var gulp = require('gulp'),
    babel = require('gulp-babel'),
    less = require('gulp-less');

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

gulp.task('dev:styles', devStyles);

gulp.task('dev:scripts', devScripts);

// JESLI CHCEMY UZYC NAZWY DO WYWOLANIA TO TASK MUSI BYC ZDEFINIOWANY PRZED UZYCIEM!!!!!!!!!!!!!!!!!!!!!!!
//mozna mieszac
gulp.task('default', gulp.series(
    [
        stub,
        gulp.parallel( //[] sa opcjonalne
            "dev:styles",
            devScripts,
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

function devScripts() {
    console.log('start scripts');
    return gulp
    //.src(['./src/scripts/app.js', './src/scripts/sth.js'])
        .src('./src/scripts/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./public/scripts'));
}

function devStyles() {
    console.log('start styles');
    return gulp
        .src('./src/styles/main.less')
        .pipe(less())
        .pipe(gulp.dest('./public/styles'));
}

function ending(cb) {
    console.log('just sth left for the end');
    cb();
}