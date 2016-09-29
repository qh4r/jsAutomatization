//./browserify app.js -o public/app.js
//./watch app.js -v -o public/app.js
// -v - verbose, -o - output
var models = require('./models'),
    $ = require('jquery');

$('body').html(models.User('Krzysztof'));

setTimeout(() => models.Car(['toyota', 'łada', 'honda', 'fiat']), 3000);