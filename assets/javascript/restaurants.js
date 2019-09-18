var currentLatitude = -33.8567844; //Sydney Opera House as default location
var currentLongitude = 151.215256; //Sydney Opera House as default location

var selectedLatitude = -33.8567844; //Sydney Opera House as default location
var selectedLongitude = 151.2152967; //Sydney Opera House as default location

var restaurantSearchInput;

var restaurantQueryURL;

function fetchYelpData() {
    $.ajax({
        url: restaurantQueryURL,
        headers: {
            'Authorization': 'Bearer QvfBaBpUXhWcP0fZX8iVke7H7mrncjHs0QNdG9IhTIZdkVtpUt4zwFXNgyK3O0JUiXq-aaXAvW-rWslz04lXssOsIeqoCQKyfTGPNgM5Qqk1aYGQD2PdUzq1zoV3XXYx',
        },
        method: 'GET',
        dataType: 'json'
    }).then(function (data) {
        for (i = 0; i < data.businesses.length; i++) {
            var cardDiv = $('<div id="restaurantCard" class="card m-1 restaurantCard" style="width: 18rem; float:left;">');
            var cardImg = $('<img src="' + data.businesses[i].image_url + '" alt="' + data.businesses[i].name + '"class="card-img-top">');
            var cardBody = $('<div class="card-body">');
            var cardTitle = $('<h5 class="card-title">' + data.businesses[i].name + '</h5>');
            var cardSubtitle = $('<p><span>' + data.businesses[i].location.city + '</span><span class="float-right">' + (data.businesses[i].distance / 1000).toFixed(2) + ' km</span></p>');
            var cardButton = $('<button class="btn btn-warning showMeMore" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapseOne">Show me more!</button>');
            var accordionDiv = $('<div id="collapse' + i + '" class="collapse" aria-labelledby="headingOne" data-parent="#restaurantCard">');
            var accordionContent = $('<div class="card-body">');
            var yelpSite = $('<a class="yelpSite" href="' + data.businesses[i].url + '">' + data.businesses[i].name + '</a>');
            var priceRating = $('<p>' + data.businesses[i].price + '</p>');
            var streetAddress = $('<address><br>' + data.businesses[i].location.address1 + '<br>' + data.businesses[i].location.city + ' ' + data.businesses[i].location.state + ' ' + data.businesses[i].location.zip_code + '</address>');
            var restaurantPhone = $('<p>Phone: ' + data.businesses[i].display_phone + '</p>');

            $(".restaurantResults").append(cardDiv);
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
            setRestaurantMasonry();
        }
        console.log("1");
    });
}


$(document).on("click", ".showMeMore", setRestaurantMasonry);

function loadRestaurantData() {
    console.log($(".restaurantResults"));

    $(".restaurantResults").hide();
    $(".restaurantResults").before('<div class="loader">');

}

function setRestaurantMasonry() {
    $(".restaurantResults").fadeIn(500);
    setTimeout(function () {
        $(".loader").remove();
        $('.restaurantResults').masonry({
            itemSelector: '',
        });
    }, 5000);
}
