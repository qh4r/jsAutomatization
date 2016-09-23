'use strict';

var test = 'znowu';

var func = function func(x) {
    x.toUpperCase();
};

console.log(func(test));

var fun = function () {
    var x = 'shhh hiden';
    return function getTip() {
        return 'its ' + x.length + ' chars long';
    };
}();

console.log(fun());
console.log('dipa');
//# sourceMappingURL=sth.js.map
