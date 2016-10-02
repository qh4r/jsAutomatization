var path = require('path');

function config() {
    return {
        entry: {
            app: './src/scripts/app',
            // scp: './src/scripts/script'
        },
        output: {
            path: path.join(__dirname, 'public', 'assets'),
            filename: '[name].js', // name to placeholder dla nazwy paczki
            publicPath: '/assets/'
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
                // {test: /\.less/, loader: 'style!css!less'}
                {test: /\.less$/, loaders: ['style', 'css', 'less']},
                {test: /\.css$/, loaders: ['style', 'css']},
                {test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2|ttf)$/, loader: 'url-loader?limit=1024'},
                //przetwarza pliki do takiego limitu wagowego na obrazki w base64
                // w tym wypadku wszystkie obrazki mniejsze niz 1KB zostana przekonwertowane do bas64

                // jesli jest wieksze niz limit to uzyty zostaje file-loader
                // FILE LOADER MUSI BYC TEZ ZAINSTALOWANY
                // dziala jako fallback gdy przekroczony limit
                {
                    test: require.resolve("jquery"),
                    loader: "expose?$!expose?jQuery"
                },
                {
                    test:   /jquery\..*\.js/,
                    loader: "imports?$=jquery,jQuery=jquery,this=>window"
                }
            ]
        }
    };
}

module.exports = config();
module.exports.clone = config;