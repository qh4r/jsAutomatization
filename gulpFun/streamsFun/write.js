'use strict';

var fs = require('fs'),
    http = require('http'),
    Transform = require('stream').Transform;

const my_transform = new Transform({
    transform: function (chunk, encoding, next) {
        this.push(chunk.toString().split('').reverse().join('').trim());
    }
});

const server = http.createServer((req, res) => {
    const fileStream = fs.createReadStream('./docs/test.txt');
    fileStream.pipe(my_transform).pipe(res);
    //fileStream.on('end', () => {res.write('\n\n done')}); // <-- to nie zadziala pipe wywoluje enda gdy sie konczy!
});

server.listen(3000);

server.on('request', (info) => {
    console.log(info.headers);
});