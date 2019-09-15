var currentSearchOption;

$(document).on("click", ".searchTypeButton", function () {
    $(".searchOptions").hide();
    currentSearchOption = $(this).attr("data-search-option");
    if (currentSearchOption === "restaurantOption") {
        getLocation();
    }
    $('#' + currentSearchOption).show();
})

var priceFilter;

$(document).on("click", ".priceOption", function () {
    priceFilter = $(this).attr("data-price");
}) //Set's price filter variable

$(document).on("click", "#submit", function () {
    $("#table").empty();

    //Start: restaurant search code...
    if ($("#userInput").val() !== "") {
        restaurantSearchInput = $("#userInput").val();
    } else {
        restaurantSearchInput = "food";
    }

    restaurantQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="' + restaurantSearchInput + '"&latitude=' + selectedLatitude + '&longitude=' + selectedLongitude;

    if (priceFilter !== undefined) {
        restaurantQueryURL = restaurantQueryURL + "&price=" + priceFilter;
    }

    //END: restaurant search code...
    if (currentSearchOption === "restaurantOption") {
        fetchYelpData();
    } else if (currentSearchOption === "recipesOption") {
        recipeData();
    }
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentLocation);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function currentLocation(position) {
    currentLatitude = position.coords.latitude;
    selectedLatitude = position.coords.latitude;

    currentLongitude = position.coords.longitude;
    selectedLongitude = position.coords.longitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle(
            { center: geolocation, radius: position.coords.accuracy });
          autocomplete.setBounds(circle.getBounds());
        });
    }//Used for google autocomplete to pick nearby addresses as default

    selectedLocation();
}