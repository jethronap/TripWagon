// \/same as jQuery(document).ready(init);
// jQuery(init); same as: the code below does not leave anything in the global scope:

// App logic goes here:

jQuery(function init($) {

  let options = {
    url: "../data.json",
    success: jsonHandler
  }

  /*
  function removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }
  */

  function jsonHandler(data) {
    let entries = data[1].entries
    // map array method which for every array element executes the callback: getCity:
    let cities = entries.map(getCity);

    function getCity(hotel) {
      return hotel.city;
      
    }
    // use instead of removeDups (there is a problem with IE but it's ok!):
    let uniqueCity = [ ...new Set(cities) ];
    //let uniqueCity = removeDups(cities);
    console.log(uniqueCity);
  }
  $.ajax(options)
});
