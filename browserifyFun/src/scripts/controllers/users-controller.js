import $ from 'jquery';
import 'jquery-ui-browserify'; // bez tego sa problemy z jquery-ui w browserify
import 'jquery-ui';
import _ from 'lodash';

import {APP_NAME} from '../lib/constants'

export default function usersControlle($mount, usersStore) {
    $mount.empty();

    const $parent = $(`
        <div class='users-controller'>
            <h1>${APP_NAME}</h1>
            <ul class='users-list' />
            <a href="#" class='add-user'>Dodaj Użytkownika</a>
        </div>
        `).appendTo($mount);

    const $usersList = $parent.find('.users-list'),
        $addUserButton = $parent.find('.add-user');

    function createUserRow(user) {
        const $row = $(`<li />`)
            .text(user.toString())
            .click(() => {
                $(`<div title='Potwierdz'>Czy napewno?</div>`).dialog({
                    modal: true,
                    buttons: {
                        Usuń() {
                            usersStore.remove(user.id);
                            $row.remove();
                            $(this).dialog('close');
                        },
                        Anuluj(){
                            $(this).dialog('close');
                        }
                    }
                })
            })
            .appendTo($usersList);

        return $row;
    }

    $addUserButton.click(e => {
        e.preventDefault();
        createUserRow(usersStore.add('first', 'last'));
    }).appendTo($parent);

    _.each(usersStore.users, x => createUserRow(x));

    return {
        destroy() {
            $parent.remove();
        }
    }
}