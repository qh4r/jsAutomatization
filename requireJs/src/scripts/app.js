import {UsersStore} from './models/users-store';
import usersController from './controllers/users-controller';
import './script';

console.log('starting app');

const store = new UsersStore();
const $mount = $('#mount');
usersController($mount, store);