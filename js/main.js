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

  function addOptions( listOfCities ) {
    // 1) Get DataList:
    let datalist = document.querySelector('#cities-list');
    // 2) Loop Over unique cities array:
    listOfCities.map( addOptionTag );
    
    function addOptionTag ( city ) {
      datalist.innerHTML += `<option value ="${city}"></option>`;
    }
    // 2.1) Inside Loop:
        // - Create option element
        // - Add city value
        // - Add to datalist (innerHTML)

  }

  function jsonHandler(data) {
    let entries = data[1].entries
    // map array method which for every array element executes the callback: getCity:
    let cities = entries.map(getCity);

    function getCity(hotel) {
      return hotel.city; 
    }

    //let uniqueCity = removeDups(cities);
    // use instead of removeDups (there is a problem with IE but it's ok!):
    let uniqueCities = [ ...new Set(cities) ];
    // alphabetically ordered the array: (keep in mind that it changes the array)
    uniqueCities.sort();
    
    console.log(uniqueCities);
    addOptions(uniqueCities);
  }
  $.ajax(options)
});
