define(['./models/users-store', './controllers/users-controller', './lib/utils', './script'], function (_usersStore, _usersController, _utils) {
    'use strict';

    var _usersController2 = _interopRequireDefault(_usersController);

    var utils = _interopRequireWildcard(_utils);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // po prostu wywoluje zawartosc pliku script
    //import {UsersStore, debugStore} from './models/users-store';
    utils.test1(); // importuje tak jak require?

    utils.test2();

    var store = new _usersStore.UsersStore();

    (0, _usersController2.default)(document.body, store);

    debugStore(store);

    var attempt = function () {
        var mnoznik = 3;
        var dzielnik = 2;

        console.log('zgadnij co sie dzieje z liczba co ja podajesz => attempt({liczba})');

        return function (input) {
            console.log(input * mnoznik / dzielnik);
        };
    }();
});