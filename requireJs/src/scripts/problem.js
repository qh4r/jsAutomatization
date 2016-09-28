export function addToBody(text) {
    $(`<p> ${text} </p>`).appendTo('body');
}



window.test = addToBody;