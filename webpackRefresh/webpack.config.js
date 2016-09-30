var path = require('path');

module.exports = {
    entry: './src/scripts.js',
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: 'app.js'
    }
};
