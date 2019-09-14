var currentLatitude = -33.8568; //Sydney Opera House as default location
var currentLongitude = 151.2153; //Sydney Opera House as default location

var selectedLatitude = -33.8568; //Sydney Opera House as default location
var selectedLongitude = 151.2153; //Sydney Opera House as default location

var restaurantSearchInput;

var restaurantQueryURL;

function fetchYelpData() {
    console.log(queryURL);
    $.ajax({
        url: restaurantQueryURL,
        headers: {
            'Authorization': 'Bearer QvfBaBpUXhWcP0fZX8iVke7H7mrncjHs0QNdG9IhTIZdkVtpUt4zwFXNgyK3O0JUiXq-aaXAvW-rWslz04lXssOsIeqoCQKyfTGPNgM5Qqk1aYGQD2PdUzq1zoV3XXYx',
        },
        method: 'GET',
        dataType: 'json'
    }).then(function (data) {
        console.log(data);
        console.log(data.businesses.length);
        for (i = 0; i < data.businesses.length; i++) {
            var cardDiv = $('<div id="restaurantCard" class="card mt-1" style="width: 18rem; float:left;">');
            var cardImg = $('<img src="' + data.businesses[i].image_url + '" alt="' + data.businesses[i].name + '"class="card-img-top">');
            var cardBody = $('<div class="card-body">');
            var cardTitle = $('<h5 class="card-title">' + data.businesses[i].name + '</h5>');
            var cardSubtitle = $('<p><span>' + data.businesses[i].location.city + '</span><span class="float-right">' + (data.businesses[i].distance / 1000).toFixed(2) + ' km</span></p>');
            var cardButton = $('<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapseOne">Show me more!</button>');
            var accordionDiv = $('<div id="collapse' + i + '" class="collapse" aria-labelledby="headingOne" data-parent="#restaurantCard">');
            var accordionContent = $('<div class="card-body">');
            var yelpSite = $('<a href="' + data.businesses[i].url + '">' + data.businesses[i].name + '</a>');
            var priceRating = $('<p>' + data.businesses[i].price + '</p>');
            var streetAddress = $('<address><br>' + data.businesses[i].location.address1 + '<br>' + data.businesses[i].location.city + ' ' + data.businesses[i].location.state + '<br>' + data.businesses[i].location.zip_code + '</address>');
            var restaurantPhone = $('<p>Phone: ' + data.businesses[i].display_phone + '</p>');

            $(cardBody).append(cardTitle);
            $(cardBody).append(cardSubtitle);
            $(cardBody).append(cardButton);
            $(accordionContent).append(priceRating);
            $(accordionContent).append(yelpSite);
            $(accordionContent).append(streetAddress);
            $(accordionContent).append(restaurantPhone);
            $(accordionDiv).append(accordionContent);
            $(cardBody).append(accordionDiv);
            $(cardDiv).append(cardImg);
            $(cardDiv).append(cardBody);

            $("#table").append(cardDiv);
        }
    });
}



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
}

window.onload = getLocation();
