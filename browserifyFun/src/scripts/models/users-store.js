//global.jQuery = require("jquery");
import _ from 'lodash';
import {User} from './user';

const _users = Symbol('users');

export class UsersStore {
    get users() {return this[_users].slice(); } // slice tworzy kopie dzieki czemu nie zwracamy referencji do prywatnego pola tylko nowa tablice

    constructor() {
        this[_users] = [
            new User(1, 'Rafał', 'Kucharski'),
            new User(2, 'Joanna', 'Małek')
        ]
    }

    add(first, last) {
        const nextId = (_.max(this[_users], x => x.id).id || 0) + 1;
        const user = new User(nextId, first, last);
        this[_users].push(user);
        return user;
    }

    remove(id) {
        _.remove(this[_users], x => x.id === id);
    }
}

//export function debugStore(store){
//    console.log(store);
//}
//
//function localFunction() {
//
//}