import {UsersStore, debugStore} from './models/users-store';
import userController from './controllers/users-controller';
import * as utils from './lib/utils'; // importuje tak jak require?
import './script'; // po prostu wywoluje zawartosc pliku script
utils.test1();
utils.test2();

const store = new UsersStore();

userController(document.body, store);

debugStore(store);

let attempt = (() => {
    const mnoznik = 3;
    const dzielnik = 2;

    console.log('zgadnij co sie dzieje z liczba co ja podajesz => attempt({liczba})');

    return (input) => {
        console.log((input*mnoznik)/dzielnik);
    }
})();