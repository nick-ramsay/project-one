var currentSearchOption;

$(document).on("click", ".searchTypeButton", function () {
    $(".searchOptions").hide();
    currentSearchOption = $(this).attr("data-search-option");
    if (currentSearchOption === "restaurantOption") {
        selectedLocation();
        getLocation();
    }
    $('#' + currentSearchOption).show();
})

var priceFilter;
var radius;

$(document).on("click", ".priceOption", function () {
    priceFilter = $(this).attr("data-price");
}) //Set's price filter variable

$(document).on("click", ".radius", function () {
    radius = $(this).attr("data-radius");
    console.log(radius);
}) //Set's filter for max radius in meters from current location

$(document).on("click", "#submit", function () {
    $("#table").empty();
    $("#restaurantContainer").empty();
    $("#userInput").attr("placeholder","e.g. chinese, pizza, burgers...");
    $("#recipeInput").attr("placeholder","e.g. mushrooms,garlic,chicken...");
    $("#recipeInput").removeAttr("style");

    // //Start: restaurant search code...
    // if ($("#userInput").val() !== "") {
    //     restaurantSearchInput = $("#userInput").val();
        
    //     restaurantQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="' + restaurantSearchInput + '"&latitude=' + selectedLatitude + '&longitude=' + selectedLongitude;

    //     if (priceFilter !== undefined) {
    //         restaurantQueryURL = restaurantQueryURL + "&price=" + priceFilter;
    //     }

    //     if (radius !== undefined) {
    //         restaurantQueryURL = restaurantQueryURL + "&radius=" + radius;
    //     }
    
    //     //END: restaurant search code...
    //     if (currentSearchOption === "restaurantOption") {
    //         loadRestaurantData();
    //         fetchYelpData();
    //         setRestaurantMasonry();
    //     } else if (currentSearchOption === "recipesOption") {
    //         loadData();
    //         recipeData();
    //         setMasonry();
    //     }
    // } else {
    //     restaurantSearchInput = "food";
    //     $("#userInput").attr("placeholder","Please enter a value");
    //     $("#userInput").css("border-color","red");
    // }


    if (currentSearchOption === "restaurantOption") {
        if ($("#userInput").val() !== "") {
            restaurantSearchInput = $("#userInput").val();
            
            restaurantQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="' + restaurantSearchInput + '"&latitude=' + selectedLatitude + '&longitude=' + selectedLongitude;
    
            if (priceFilter !== undefined) {
                restaurantQueryURL = restaurantQueryURL + "&price=" + priceFilter;
            }
    
            if (radius !== undefined) {
                restaurantQueryURL = restaurantQueryURL + "&radius=" + radius;
            }
            loadRestaurantData();
            fetchYelpData();
            setRestaurantMasonry();
        }
        else {
            restaurantSearchInput = "food";
            $("#userInput").attr("placeholder","Please enter a value");
            $("#userInput").css("border-color","red");
        }
    } else if (currentSearchOption === "recipesOption") {
        if ($("#recipeInput").val() !== "") {
            loadData();
            recipeData();
            setMasonry();
        } else {
            $("#recipeInput").attr("placeholder","Please enter a value");
            $("#recipeInput").css("border-color","red");
        }
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

