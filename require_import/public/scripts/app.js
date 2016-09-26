define(['./models/users-store', './controllers/users-controller', './script'], function (_usersStore, _usersController) {
  'use strict';

  var _usersController2 = _interopRequireDefault(_usersController);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  console.log('starting app');

  var store = new _usersStore.UsersStore();
  var $mount = $('#mout');
  (0, _usersController2.default)($mount, store);
});