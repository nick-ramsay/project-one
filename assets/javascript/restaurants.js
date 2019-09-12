var latitude = 0;
var longitude = 0;

var searchInput;

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
        for (i=0; i < data.businesses.length; i++) {
            var cardDiv = $('<div id="restaurantCard" class="card mt-1" style="width: 18rem;">');
            var cardImg = $('<img src="'+ data.businesses[i].image_url +'" alt="' + data.businesses[i].name + '"class="card-img-top" alt=>');
            var cardBody = $('<div class="card-body">');
            var cardTitle = $('<h5 class="card-title">' + data.businesses[i].name + '</h5><p>'+ data.businesses[i].location[3] +'</p>"');
            var cardButton = $('<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse'+ i + '" aria-expanded="false" aria-controls="collapseOne">Show me more!</button>');
            var accordionDiv = $('<div id="collapse'+ i + '" class="collapse" aria-labelledby="headingOne" data-parent="#restaurantCard">');
            var accordionContent = '<div class="card-body">';
            var restaurantPhone = '<p>Phone: ' + data.businesses[i].display_phone + '"</p>';
            
            $(cardBody).append(cardTitle);
            $(cardBody).append(cardButton);
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


$(document).on("click","#sumbit", function() {
    $("#table").empty();
    queryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude=' + longitude;
    fetchYelpData();
})

window.onload = getLocation();
