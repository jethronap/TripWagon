// \/same as jQuery(document).ready(init);
// jQuery(init); same as: the code below does not leave anything in the global scope:

// App logic goes here:

jQuery(function init($) {

    let options = {
        url: "../data.json",
        success: jsonHandler
    }
    function jsonHandler(data) {
        document.querySelector('#cities-list').innerHTML =
            `
        <option value="${data[1].entries[0].city}"></option>
        <option value="${data[1].entries[1].city}"></option>
        <option value="${data[1].entries[2].city}"></option>
        `

    }
    $.ajax(options)
});
