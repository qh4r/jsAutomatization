define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.addToBody = addToBody;
    function addToBody(text) {
        $('<p> ' + text + ' </p>').appendTo('body');
    }

    window.test = addToBody;
});