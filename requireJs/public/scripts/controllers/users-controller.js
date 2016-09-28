define(['exports', 'jquery', 'lodash', '../lib/constants', 'jquery-ui'], function (exports, _jquery, _lodash, _constants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = usersControlle;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function usersControlle($mount, usersStore) {
        $mount.empty();

        var $parent = (0, _jquery2.default)('\n        <div class=\'users-controller\'>\n            <h1>' + _constants.APP_NAME + '</h1>\n            <ul class=\'users-list\' />\n            <a href="#" class=\'add-user\'>Dodaj Użytkownika</a>\n        </div>\n        ').appendTo($mount);

        var $usersList = $parent.find('.users-list'),
            $addUserButton = $parent.find('.add-user');

        function createUserRow(user) {
            var $row = (0, _jquery2.default)('<li />').text(user.toString()).click(function () {
                (0, _jquery2.default)('<div title=\'Potwierdz\'>Czy napewno?</div>').dialog({
                    modal: true,
                    buttons: {
                        Usuń: function Usu() {
                            usersStore.remove(user.id);
                            $row.remove();
                            (0, _jquery2.default)(this).dialog('close');
                        },
                        Anuluj: function Anuluj() {
                            (0, _jquery2.default)(this).dialog('close');
                        }
                    }
                });
            }).appendTo($usersList);

            return $row;
        }

        $addUserButton.click(function (e) {
            e.preventDefault();
            createUserRow(usersStore.add('first', 'last'));
        }).appendTo($parent);

        _lodash2.default.each(usersStore.users, function (x) {
            return createUserRow(x);
        });

        return {
            destroy: function destroy() {
                $parent.remove();
            }
        };
    }
});