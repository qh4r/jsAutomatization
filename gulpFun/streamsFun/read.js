var fs = require('fs');

var reader = fs.createReadStream('./docs/test.txt');

reader.on('data', (data) => {
    console.log(`text: ${data.toString()}`);
});


reader.on('end', () => {
    console.log('koniec')
});