var priceFilter;

$(document).on("click", ".priceOption", function () {
    priceFilter = $(this).attr("data-price");
    console.log(priceFilter);
}) //Set's price filter variable

$(document).on("click", "#submit", function () {
    $("#table").empty();
    if ($("#userInput").val() !== "") {
        restaurantSearchInput = $("#userInput").val();
    } else {
        restaurantSearchInput = "food";
    }

    restaurantQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="' + restaurantSearchInput + '"&latitude=' + selectedLatitude + '&longitude=' + selectedLongitude;
    
    console.log(priceFilter);

    if (priceFilter !== undefined) {
        restaurantQueryURL = restaurantQueryURL + "&price=" + priceFilter;
    }

    if ($('#restaurantButton').is(':checked')) {
        fetchYelpData()
    } else if ($('#recipeButton').is(':checked')) {
        alert("Recipe Development Underway... try again later!");
    } else {
        alert("Please pick Restaurant or Recipe radio buttons");
    }
})