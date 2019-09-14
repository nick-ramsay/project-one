var latitude = 0;
var longitude = 0;

var searchInput = "food";

var queryURL;

function fetchYelpData() {
    $.ajax({
        url: queryURL,
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
            var cardSubtitle = $('<p><span>' + data.businesses[i].location.city + '</span><span class="float-right">' + (data.businesses[i].distance/1000).toFixed(2) + ' km</span></p>');
            var cardButton = $('<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapseOne">Show me more!</button>');
            var accordionDiv = $('<div id="collapse' + i + '" class="collapse" aria-labelledby="headingOne" data-parent="#restaurantCard">');
            var accordionContent = $('<div class="card-body">');
            var yelpSite = $('<a href="' + data.businesses[i].url + '">' + data.businesses[i].name + '</a>');
            var priceRating = $('<p>' + data.businesses[i].price + '</p>');
            var streetAddress = $('<address><br>'+ data.businesses[i].location.address1 + '<br>' + data.businesses[i].location.city + ' ' + data.businesses[i].location.state + '<br>' + data.businesses[i].location.zip_code + '</address>');
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
            //var restaurantImage = '<img src="'+ data.businesses[i].image_url +'" alt="' + data.businesses[i].name + '" height="200px" width="200px">'
            //var restaurantName = '<p class="card-text">' + data.businesses[i].name + '</p>';

            //$("#restaurants").append(restaurantImage);
            //$("#restaurants").append(restaurantName);
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
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}


$(document).on("click", "#sumbit", function () {
    $("#table").empty();
    if ($("#userInput").val() !== "") {
        searchInput = $("#userInput").val();
    }
    queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="' + searchInput + '"&latitude=' + latitude + '&longitude=' + longitude;
    console.log(queryURL);
    fetchYelpData();
})

window.onload = getLocation();
