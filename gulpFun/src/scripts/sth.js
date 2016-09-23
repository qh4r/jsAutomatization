let test = 'znowu';

const func = (x) => {
    x.toUpperCase();
};

console.log(func(test));

let fun = (() => {
    var x = 'shhh hiden';
    return function getTip(){
        return `its ${x.length} chars long`;
    }
})();

console.log(fun());
console.log('dipa')