// \/same as jQuery(document).ready(init);
// jQuery(init); same as: the code below does not leave anything in the global scope:

// App logic goes here:

jQuery( function init($) {

    let options = {
        url: "../data.json",
        success: jsonHandler
    }
    function jsonHandler (data) {
        console.log(data);
        
    }
    $.ajax(options)
});
