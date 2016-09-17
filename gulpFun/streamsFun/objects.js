'use strict';

var stream = require('stream');

// streamy w gulpie zawsze sa w object modzie
const source = new stream.Readable({
    objectMode: true // aktywuje object mode - wszystkie streamy musza miec to aktywowane z osobna
});

source.push('hyhy');
source.push('haha');
//source.push({file: 'test.txt', length: 1337});  // zwykly stream obsluguje tylko stringi i bufery

source.push({name: 'Rafał'}); // dziala tylko w object modzie
source.push({name: 'Asia'});

const dest = new stream.Writable({
    objectMode: true,
    write: function(chunk, encoding, next) {
        console.log(`Pisze: ${(chunk.name || chunk).toString()}`);
        next();
    }
});

const transform = stream.Transform({
    objectMode: true,
    transform: function(chunk, encoding, next) {
        this.push((chunk.name || chunk).toString().toUpperCase());
        next();
    }
});


source.pipe(transform).pipe(dest);

source.push('moar!!');

source.push(null); // NULL KONCZY STREAM