var _ = require('lodash'),
    $ = require('jquery');

exports.User = function (name) {
    var output = `user => ${name}`;
    console.log(output);
    return output;
};

exports.Car = function (types) {
    let $list = $(`<ul></ul>`);
    _.each(types, (x, i) => {
        $(`<li>${i} -> ${x}</li>`).appendTo($list);
    });
    $list.appendTo('body');
};