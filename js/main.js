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
  range.addEventListener("change", handleRangeSlide);
  // handle property types:
  let starMenu = document.querySelector("#menu-star");
  starMenu.addEventListener("change", handleStarSelection);
  // handle user rating:
  let userRatingMenu = document.querySelector("#menu-rating");
  userRatingMenu.addEventListener("change", handleUserRating);
  // handle map:
  //let map = document.querySelector("#mapPhoto");
  //map.addEventListener("click", handleMap);

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

  function openMap(options) {

    if (options.zoom === undefined) {
        options.zoom = 4;
    };
  
    if (options.target === undefined) {
        options.target = 'mapModal';
    };
    let map = new ol.Map({
        target: options.target,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([options.lon, options.lat]),
            zoom: options.zoom
        })
    });
    // add marker
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([options.lon, options.lat]) //[-74.006,40.7127]
      ),  // Cordinates of New York's Town Hall
    });
    let vectorSource = new ol.source.Vector({
      features: [marker]
    });
    let markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
    map.addLayer(markerVectorLayer);
  };

  function getCityFromSelection(selectedCity) {
    selectedCity = selectedCity.toLowerCase().trim();
    let hotel = entries.filter(entry => entry.city.toLowerCase() === selectedCity);
    return hotel;
  }

  function getHotelFromPrice(selectedPrice) {
    let hotel = entries.filter(entry => entry.price < selectedPrice);
    return hotel;
  }

  function getHotelFromStar(selectedStar) {
    let hotel = entries.filter(entry => entry.rating === selectedStar);
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
      let template = document.querySelector("#template");
      // made a clone of the template
      let clone = template.cloneNode(true);
      
      let img = clone.querySelector(".hotel-photo");
      let name = clone.querySelector("#hotel-name");
      let cityName = clone.querySelector("#city-name");
      let ratingNumber = clone.querySelector("#rating-num");
      // change the attributtes of the template:
      img.setAttribute("src", hotel.thumbnail);
      name.innerHTML = hotel.hotelName;
      cityName.innerHTML = hotel.city;
      ratingNumber.innerHTML = hotel.ratings.no;
      
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
    else if (e.type === 'click') {

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

function handleMap() {
  console.log("hi");
  //console.log(entries[0].mapData);
  
 document.querySelector("#mapBody").innerHTML = "";
  
  openMap( entries[0].mapData );
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