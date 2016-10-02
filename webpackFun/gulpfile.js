'use strict';
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config'),
    WebpackDevServer = require('webpack-dev-server');

gulp.task('dev', (cb) => {
    const compiler = webpack(createDevConfig());
    compiler.run((err, stats) => {
        if(err) {
            console.error(err);
            return;
        }

        console.log(stats.toString({
            colors: true,
            exclude: ['node_modules', 'bower_components', 'jam', 'components']
        }));
        cb();
    })
});

gulp.task('watch', () => {
    var config = createDevConfig();
    console.log(config);

    config.output.publicPath = 'http://localhost:8085/public/';
    console.log(config);

    const compiler = webpack(config);

    const devServer = new WebpackDevServer(compiler, {
        inline: true,
        stats: {
            colors: true,
            exclude: ['node_modules', 'bower_components', 'jam', 'components']
        }
    });

    devServer.listen(8085, 'localhost', () => {
        console.log('server wystartowal');
    })
});

function createDevConfig() {
    var config = webpackConfig.clone();
    return config;
}