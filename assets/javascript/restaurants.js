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
        var restaurantResults = $('<div id="restaurantResults">');
        $("#restaurantContainer").append(restaurantResults);
        for (i = 0; i < data.businesses.length; i++) {
            var cardDiv = $('<div id="restaurantCard" class="card m-1 restaurantCard" style="width: 18rem; float:left;">');
            var cardImg = $('<img src="' + data.businesses[i].image_url + '" alt="' + data.businesses[i].name + '"class="card-img-top">');
            var cardBody = $('<div class="card-body">');
            var cardTitle = $('<h5 class="card-title">' + data.businesses[i].name + '</h5>');
            var cardSubtitle = $('<p><span>' + data.businesses[i].location.city + '</span><span class="float-right">' + (data.businesses[i].distance / 1000).toFixed(2) + ' km</span></p>');

            var restModalDiv = $('<div class="card-body restaurantDetails mfp-hide">');

            var cardButton = $('<button type="button" class="btn btn-warning showMeMore" data-toggle="modal" data-target="#restaurantModal' + i + '">Show me more!</button>');

            var restModalTitle = $('<h1 class="card-title restModalTitle">' + data.businesses[i].name + '</h1>');
            var pluralReviews = "";
            if (data.businesses[i].review_count > 1) {
                pluralReviews = "s"
            } else {
                pluralReviews = "";
            }
            var restModalReviews = $('<p style="color: whitesmoke; font-family: cursive;">' + data.businesses[i].review_count + ' review' + pluralReviews + ' for average of ' + data.businesses[i].rating + ' stars</p>')
            var yelpImg = $('<img src="' + data.businesses[i].image_url + '" alt="' + data.businesses[i].name + '" class="img-thumbnail" style="width:30%; height:30%;">');
            var restModalInfo = $('<div class="restModalInfo">');
            var yelpSite = $('<a style="color: whitesmoke; font-family: cursive;" class="yelpSite" href="' + data.businesses[i].url + '" target="_blank">' + data.businesses[i].name + '</a>');
            var priceRating = $('<p style="color: whitesmoke; font-family: cursive;">' + data.businesses[i].price + '</p>');
            var streetAddress = $('<address style="color: whitesmoke; font-family: cursive;"><br>' + data.businesses[i].location.address1 + '<br>' + data.businesses[i].location.city + ' ' + data.businesses[i].location.state + ' ' + data.businesses[i].location.zip_code + '</address>');
            var restaurantPhone = $('<p style="color: whitesmoke; font-family: cursive;">Phone: ' + data.businesses[i].display_phone + '</p>');

            $(restaurantResults).append(cardDiv);
            $(cardBody).append(cardTitle);
            $(cardBody).append(cardSubtitle);
            $(cardBody).append(cardButton);
            $(cardButton).append(restModalDiv);

            $(restModalDiv).append(restModalTitle);
            $(restModalDiv).append(restModalReviews);
            if (data.businesses[i].image_url != "") {
                $(restModalDiv).append(yelpImg);
            }
            $(restModalDiv).append(restModalInfo);
            if (data.businesses[i].price != undefined) {
                $(restModalInfo).append(priceRating);
            }
            if (data.businesses[i].url != undefined) {
                $(restModalInfo).append(yelpSite);
            }
            if (data.businesses[i].location.address1 != undefined) {
                $(restModalInfo).append(streetAddress);
            }
            if (data.businesses[i].display_phone != undefined) {
                $(restModalInfo).append(restaurantPhone);
            }


            if (data.businesses[i].image_url != "") {
                $(cardDiv).append(cardImg);
            }
            $(cardDiv).append(cardBody);
        }
    });
}

function loadRestaurantData() {
    $("#restaurantOption #restaurantContainer").hide();
    $("#restaurantOption #restaurantContainer").before('<div class="loader">');

}

function setRestaurantMasonry() {
    setTimeout(function () {
        $(".loader").remove();
        $("#restaurantOption #restaurantContainer").fadeIn(500);
        $("#restaurantResults").masonry({
            itemSelector: '.restaurantCard'
            //columnWidth: 100,
            //fitWidth: true
        });
    }, 5000);
}

$(document).on('click', '.showMeMore', function () {
    var showMeMore = $(this).find('.restaurantDetails')
    $.magnificPopup.open({
        items: {
            src: showMeMore,
        },
        type: 'inline'
    });
});
