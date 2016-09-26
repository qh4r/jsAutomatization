import {UsersStore} from './models/users-store';
import usersController from './controllers/users-controller';
import './script';

console.log('starting app');

const store = new UsersStore();
const $mount = $('#mout');
usersController($mount, store);