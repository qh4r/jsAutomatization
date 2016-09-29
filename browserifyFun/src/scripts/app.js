import 'jquery-ui/themes/ui-darkness/jquery-ui.css';
import $ from 'jquery';
import {UsersStore} from './models/users-store';
import usersController from './controllers/users-controller';
import './script';


console.log('starting app');

const store = new UsersStore();
const $mount = $('#mount');

console.log($mount);
usersController($mount, store);