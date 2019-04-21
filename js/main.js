// ↓ same as jQuery(document).ready(init);
// jQuery(init); same as: the code below does not leave anything in the global scope:

// App logic goes here:

jQuery(function init($) {

  let options = {
    url: "./data.json",
    success: jsonHandler
  }
  let entries; // we define it here so it can be used from other methods
  let selectedCity;
  let selectedPrice;
  let selectedRating;

  // handle city input:
  let citiesInput = document.querySelector("#cities-list-choice");
  citiesInput.addEventListener("keydown", handleCityInput);
  // handle suchen btn:
  let suchen = document.querySelector("#suchenbtn");
  suchen.addEventListener("click", handleCityInput);
  // handle the range slider:
  let range = document.querySelector("#slider");
  range.addEventListener("mouseup", handleRangeSlide);
  // handle property types:
  let starMenu = document.querySelector("#menu-star");
  starMenu.addEventListener("change", handleStarSelection);
  // handle user rating:
  let userRatingMenu = document.querySelector("#menu-rating");
  userRatingMenu.addEventListener("change", handleUserRating);

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

  function getHotelFromPrice(selectedPrice) {
    let hotel = entries.filter(entry => entry.price < selectedPrice);
    return hotel;
  }

  function getHotelFromStar(selectedStar) {
    let hotel = entries.filter(entry => entry.rating == selectedStar);
    return hotel;
  }

  function getHotelFromUserRating(selectedRating) {
    let hotel = entries.filter(entry => entry.ratings.no < selectedRating);
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

    // when enter in search bar is pressed:
    if (e.keyCode === 13) {
      //get city value:
      selectedCity = this.value; // === citiesInput.value === e.target
      selectedCity.toLowerCase().trim();
      // display hotels using getCityFromSelection
      let foundHotels = getCityFromSelection(selectedCity);
      displaySelectedHotels(foundHotels);
    }
    // when suchen btn is pressed:
    else if (e.type == 'click') {

      selectedCity = citiesInput.value
      // display hotels using getCityFromSelection
      let foundHotels = getCityFromSelection(selectedCity);
      displaySelectedHotels(foundHotels);
    }
  }

  function handleRangeSlide() {
    let result = document.querySelector("#rangeres");
    result.innerHTML = range.value + " EUR"
    selectedPrice = range.value

    let foundHotels = getHotelFromPrice(selectedPrice);
    if (selectedPrice > 0) {
      displaySelectedHotels(foundHotels);
    }
  }

  function handleStarSelection() {
    if (starMenu.value === '0') {
      let hotelsSection = document.querySelector(".hotels");
      hotelsSection.innerHTML = "do you think we are that BASSE CLASSE 💩!?";
    } else if (starMenu.value === '1') {
      selectedStar = starMenu.value;
      let foundHotels = getHotelFromStar(selectedStar);
      displaySelectedHotels(foundHotels);
    } else if (starMenu.value === '2') {
      selectedStar = starMenu.value;
      let foundHotels = getHotelFromStar(selectedStar);
      displaySelectedHotels(foundHotels);
    } else if (starMenu.value === '3') {
      selectedStar = starMenu.value;
      let foundHotels = getHotelFromStar(selectedStar);
      displaySelectedHotels(foundHotels);
    } else if (starMenu.value === '4') {
      selectedStar = starMenu.value;
      let foundHotels = getHotelFromStar(selectedStar);
      displaySelectedHotels(foundHotels);
    } else if (starMenu.value === '5') {
      selectedStar = starMenu.value;
      let foundHotels = getHotelFromStar(selectedStar);
      displaySelectedHotels(foundHotels);
    }
  }

  function handleUserRating() {
    console.log("hi");
    //console.log(foundHotels);

    if (userRatingMenu.value <= 2) {
      selectedRating = userRatingMenu.value;
      let foundHotels = getHotelFromUserRating(selectedRating);
      displaySelectedHotels(foundHotels);
    } else if (userRatingMenu.value > 2 && userRatingMenu.value <= 6) {
      selectedRating = userRatingMenu.value;
      let foundHotels = getHotelFromUserRating(selectedRating);
      displaySelectedHotels(foundHotels);
    } else if (userRatingMenu.value > 6 && userRatingMenu.value <= 7) {
      selectedRating = userRatingMenu.value;
      let foundHotels = getHotelFromUserRating(selectedRating);
      displaySelectedHotels(foundHotels);
    } else if (userRatingMenu.value > 7 && userRatingMenu.value <= 8.5) {
      selectedRating = userRatingMenu.value;
      let foundHotels = getHotelFromUserRating(selectedRating);
      displaySelectedHotels(foundHotels);
    } else if (userRatingMenu.value > 8.5 && userRatingMenu.value <= 10) {
      selectedRating = userRatingMenu.value;
      let foundHotels = getHotelFromUserRating(selectedRating);
      displaySelectedHotels(foundHotels);
    }

  }

  // get hotel data:
  $.ajax(options)
});
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