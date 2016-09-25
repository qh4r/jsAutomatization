'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UsersStore = undefined;
exports.debugStore = debugStore;

var _user = require('./user');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersStore = exports.UsersStore = function UsersStore() {
    _classCallCheck(this, UsersStore);
};

function debugStore(store) {
    console.log(store);
}

function localFunction() {}