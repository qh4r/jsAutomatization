import $ from 'jquery';
import 'jquery-ui-browserify';
import {UsersStore} from './models/users-store';
import usersController from './controllers/users-controller';
import './script';

// import 'jquery-ui-browserify/themes/ui-darkness/jquery-ui.css'
import '../styles/ui_darkness/jquery-ui.css'


console.log('starting app =]');

import '../styles/main.less'

const store = new UsersStore();
const $mount = $('#mount');
usersController($mount, store);

