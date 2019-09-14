$(document).on("click", "#submit", function () {
    $("#table").empty();
    if ($("#userInput").val() !== "") {
        restaurantSearchInput = $("#userInput").val();
    }
    
    restaurantQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="' + restaurantSearchInput + '"&latitude=' + selectedLatitude + '&longitude=' + selectedLongitude;
    
    if ($('#restaurantButton').is(':checked')) { 
        fetchYelpData()
    } else if ($('#recipeButton').is(':checked')) {
        alert("Recipe Development Underway... try again later!");
    } else {
        alert("Please pick Restaurant or Recipe radio buttons");
    }
})