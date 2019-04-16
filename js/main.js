// \/same as jQuery(document).ready(init);
// jQuery(init); same as: the code below does not leave anything in the global scope:

// App logic goes here:

jQuery(function init($) {

  let options = {
    url: "../data.json",
    success: jsonHandler
  }

  function jsonHandler(data) {
    let entries = data[1].entries
    let cities = entries.map(getCity);

    function getCity(hotel) {

      return hotel.city;
      //let uniq = [ ...new Set(hotel.city) ];

    }

    function removeDups(names) {
      let unique = {};
      names.forEach(function (i) {
        if (!unique[i]) {
          unique[i] = true;
        }
      });
      return Object.keys(unique);
    }

    let uniqueCity = removeDups(cities);
    console.log(uniqueCity);

  }
  $.ajax(options)
});
