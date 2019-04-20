// ↓ same as jQuery(document).ready(init);
// jQuery(init); same as: the code below does not leave anything in the global scope:

// App logic goes here:

jQuery(function init($) {

  let options = {
    url: "../data.json",
    success: jsonHandler
  }
  let entries; // we define it here so it can be used from other methods
  let selectedCity;
  // handle city input:
  let citiesInput = document.querySelector("#cities-list-choice");
  citiesInput.addEventListener("keydown", handleCityInput);
  // handle suchen btn:
  let suchen = document.querySelector("#suchenbtn");
  console.log(suchen);
  
  suchen.addEventListener("click", handleCityInput);
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

  function addOptions(listOfCities) {
    // 1) Get DataList:
    let datalist = document.querySelector('#cities-list');
    // 2) Loop Over unique cities array:
    listOfCities.map(addOptionTag);

    function addOptionTag(city) {
      datalist.innerHTML += `<option value ="${city}"></option>`;
    }
    // 2.1) Inside Loop:
    // - Create option element
    // - Add city value
    // - Add to datalist (innerHTML)

  }

  function jsonHandler(data) {
    entries = data[1].entries
    // map array method which for every array element executes the callback: getCity:
    let cities = entries.map(getCity);

    function getCity(hotel) {
      return hotel.city;
    }

    //let uniqueCity = removeDups(cities);
    // use instead of removeDups (there is a problem with IE but it's ok!):
    let uniqueCities = [...new Set(cities)];
    // alphabetically ordered the array: (keep in mind that it changes the array)
    uniqueCities.sort();

    addOptions(uniqueCities);

  }

  function getCityFromSelection(selectedCity) {
    let hotel = entries.filter(entry => entry.city.toLowerCase() === selectedCity.toLowerCase().trim());
    return hotel;
  }

  function displaySelectedHotels(foundHotels) {

    // empty the hotel sections:
    let hotelsSection = document.querySelector(".hotels");
    hotelsSection.innerHTML = "";

    //1. Loop found Hotels' list:
    foundHotels.map(displayHotel);


    function displayHotel(hotel) {
      //1.1 For every hotel obj -> get Template -> clone -> update content -> append to hotels
      let template = document.querySelector('#template');
      // made a clone of the template
      let clone = template.cloneNode(true);
      let img = clone.querySelector(".hotel-photo");
      // change the attributtes of the template:
      img.setAttribute("src", hotel.thumbnail);
      
      // removed the hidden class from the clone:
      clone.classList.remove("hidden");
      hotelsSection.appendChild(clone);

    }

  }

  function handleCityInput(e) {
    if (e.keyCode === 13 ) {

      //get city value:
      selectedCity = this.value; // === citiesInput.value === e.target
      selectedCity.toLowerCase().trim();
      // display hotels using getCityFromSelection
      let foundHotels = getCityFromSelection(selectedCity);
      displaySelectedHotels(foundHotels);

    }
    else if (e.type == 'click') {
    
      selectedCity = citiesInput.value
      // display hotels using getCityFromSelection
      let foundHotels = getCityFromSelection(selectedCity);
      displaySelectedHotels(foundHotels);
    
    }

  }

  let rangeSlider = function(){
    let slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
      
    slider.each(function(){
  
      value.each(function(){
        let value = $(this).prev().attr('value');
        $(this).html(value);
      });
  
      range.on('input', function(){
        $(this).next(value).html(this.value);
      });
    });
  };
  
  rangeSlider();

  // get hotel data:
  $.ajax(options)
});
