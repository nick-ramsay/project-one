var currentLatitude = -33.856159;
var currentLongitude = 151.215256;

var selectedLatitude = -33.856159;
var selectedLongitude = 151.215256;

function selectedLocation() {
    selectedLocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + selectedLatitude + ',' + selectedLongitude + '&key=AIzaSyCUsqWQiU-SIFRi7Sd4HVtu5qDpwXq4KYE';

    $.ajax({
        url: selectedLocationURL,
        method: "GET"
    }).then(function (response) {
        $("#selectedLocation").text(response.results[0].formatted_address);
    }
    )
}

//START: Code for changing location via google

var addressSearchInput;
var newAddressURL;

function changeSelectedAddress () {
    $.ajax({
        url: newAddressURL,
        method: "GET"
    }).then(function(response){
        selectedLatitude = response.results[0].geometry.location.lat;
        selectedLongitude = response.results[0].geometry.location.lng;
        selectedLocation();
    })
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), { types: ['geocode'] });

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  addressSearchInput = "";
  newAddressURL = "";
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();


  for (var i = 0; i < place.address_components.length; i++) {
      addressSearchInput = addressSearchInput + place.address_components[i].long_name + " ";
  }
  addressSearchInput = addressSearchInput.replace(/ /g,"+");
  newAddressURL = ('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSearchInput + '&key=AIzaSyCUsqWQiU-SIFRi7Sd4HVtu5qDpwXq4KYE');
  changeSelectedAddress();
  locationParametersClose();
}

function locationParametersOpen() {
  $("#changeLocation").hide();
  $("#locationParameters").show();
}

function locationParametersClose() {
  $("#locationParameters").hide();
  $("#changeLocation").show();
}

$(document).on("click","#changeLocationBtn", locationParametersOpen);
$(document).on("click",".closeLocationParameters", locationParametersClose);