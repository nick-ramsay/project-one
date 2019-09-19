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
        console.log("then AJAX");
        for (i = 0; i < data.businesses.length; i++) {
            var cardDiv = $('<div id="restaurantCard" class="card m-1 restaurantCard" style="width: 18rem; float:left;">');
            var cardImg = $('<img src="' + data.businesses[i].image_url + '" alt="' + data.businesses[i].name + '"class="card-img-top">');
            var cardBody = $('<div class="card-body">');
            var cardTitle = $('<h5 class="card-title">' + data.businesses[i].name + '</h5>');
            var cardSubtitle = $('<p><span>' + data.businesses[i].location.city + '</span><span class="float-right">' + (data.businesses[i].distance / 1000).toFixed(2) + ' km</span></p>');
            //var cardButton = $('<button class="btn btn-warning showMeMore" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapseOne">Show me more!</button>');
            //var cardButton = $('<button class="btn btn-warning showMeMore" type="button" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapseOne">Show me more!</button>');

            var cardButton = $('<button type="button" class="btn btn-warning showMeMore" data-toggle="modal" data-target="#restaurantModal' + i + '">Show me more!</button>');

            var restaurantModalDiv = $('<div align="center" class="modal fade" id="restaurantModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">');
            var restaurantModalContainer = $('<div class="modal-dialog modal-dialog-centered" role="document">');
            var restaurantModalContent = $('<div class="modal-content">');
            var restaurantModalHeaderDiv = $('<div class="modal-header">');
            var restaurantModalHeader = $('<h5 class="modal-title" id="restModalHeader'+ i +'">');
            var restaurantModalClose = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'); 
            var restaurantModalBody = $('<div class="modal-body" id="restModalBody' + i + '">');
            var restaurantModalFooter = $('<div class="modal-footer">');
            
            var yelpImg = $('<img src="' + data.businesses[i].image_url + '" alt="' + data.businesses[i].name + '" class="img-thumbnail" style="width:50%; height:50%;">');
            var yelpSite = $('<a class="yelpSite" href="' + data.businesses[i].url + '">' + data.businesses[i].name + '</a>');
            var priceRating = $('<p>' + data.businesses[i].price + '</p>');
            var streetAddress = $('<address><br>' + data.businesses[i].location.address1 + '<br>' + data.businesses[i].location.city + ' ' + data.businesses[i].location.state + ' ' + data.businesses[i].location.zip_code + '</address>');
            var restaurantPhone = $('<p>Phone: ' + data.businesses[i].display_phone + '</p>');

            $(restaurantResults).append(cardDiv);
            $(cardBody).append(cardTitle);
            $(cardBody).append(cardSubtitle);
            $(cardBody).append(cardButton);
            
            
            $(restaurantModalDiv).append(restaurantModalContainer);
            $(restaurantModalContainer).append(restaurantModalContent);
            $(restaurantModalContent).append(restaurantModalHeaderDiv);
            $(restaurantModalHeaderDiv).append(restaurantModalHeader);
            $(restaurantModalHeaderDiv).append(restaurantModalClose);
            $(restaurantModalContent).append(restaurantModalBody);
            $(restaurantModalContent).append(restaurantModalFooter);
            $(cardBody).append(restaurantModalDiv);

            $(restaurantModalBody).append(yelpImg);
            $(restaurantModalBody).append(priceRating);
            $(restaurantModalBody).append(yelpSite);
            $(restaurantModalBody).append(streetAddress);
            $(restaurantModalBody).append(restaurantPhone);

            $(cardDiv).append(cardImg);
            $(cardDiv).append(cardBody);
            $('#restModalHeader' + i).text(data.businesses[i].name);
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
            itemSelector: '.restaurantCard',
        });
    }, 5000);
}
