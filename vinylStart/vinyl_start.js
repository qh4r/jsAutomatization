'use strict';

var vfs = require('vinyl-fs'),
    stream = require('stream'),
    fs = require('fs'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

const simplePlugin = new stream.Transform({
    objectMode: true,
    transform: function (file, enc, next) {
        console.log(file);
        var content = file.contents.toString();
        file.contents = new Buffer(content.replace(/log/g, 'error'));
        this.push(file); // aleternatywnie zamiast next(null, file) - efekt ten sam
        next();
        //next(null, file); // dzieki temu kolejka nie zostanie przerwana
        // next to standardowy callback - pierwszy argument to error
    }
});

vfs.src('./src/*.js')
    .pipe(simplePlugin)
    .pipe(vfs.dest('./target'));

fs.createReadStream('./docs/doc.txt') /// samo w sobie nie zadziala bo vinyl dziala tylko na objec streamy
    // BEZ SOURCE STREAMU VINYL RZUCA BARDZO DZIWNE BLEDY -> WYPISUJE ZE PATH MUSI BYC STRINGIEM (BO BRAKUJE MU NAZWY PLIKU)
    .pipe(source('text.txt')) //tutaj tworzony jest plik ze streamu ktory zostal pobrany przed chwila - ma taka nazwe jka tu
    .pipe(buffer()) //sprawia ze ponizsze dziala!
    .pipe(simplePlugin) // nie zadzaial bez vinyl-buffera bo prosty plugin nie oblsuguje streamowanej zawartosci
    .pipe(vfs.dest('./target'));