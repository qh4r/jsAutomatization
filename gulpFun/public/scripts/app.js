"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var asd = 32;

var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
};

var firstPerson = new Person("Krzyś");
console.log([asd, firstPerson]);