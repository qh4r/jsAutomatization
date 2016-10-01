var path = require('path');

module.exports = {
    entry: './src/scripts/scripts.js',
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.css/, loader: 'style!css!'},
            { test: /bad\.js$/, loader: 'exports?test&errorLog!imports?$=jquery'}
        ]
    }
};
