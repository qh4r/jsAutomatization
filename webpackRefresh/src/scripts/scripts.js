var amd = require('./amd');

//loadery przetwarzane sa od prawej do lewej (tak jakby lewa to output)
// css loader parsuje cssa i laduje obrazki zaleznosci itd
// style loader dodaje css do strony
// var css = require("style!css!../styles/styles.css");

//alternatywa to konfiguracja w configu - ktorej uzyje
var css = require("../styles/styles.css");

console.log('css', css);

// po ? przekazywany ejst parametr
// w tym wypakdu to nazwa funkcji ktora bedzie wyciagnieta jako export z pliku bad.js (mimo tego ze ten plik nie wykonuje exportow)

//imports sprawia ze do $ zostanie zaimportowane jquery
// var bad = require('exports?test&errorLog!imports?$=jquery!./bad');

/// alternatywny loader w konfigu
var bad = require('./bad');
console.log('bad', bad);
bad.errorLog('asda');
bad.test();
console.log('hello');