function recipeData() {
    $("#recipesOption #table").html("");
    var searchRecipe = $("#recipesOption #userInput").val();
    var recipeUrl = "https://api.edamam.com/search?q=" + searchRecipe + "&app_id=cc84332e&app_key=7305bef5a7c92a751b9bfdf0b0ef0c63&from=0&to=15&calories=591-722&health=alcohol-free";
    $.ajax({
        url: recipeUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var cardRecipeDiv = $('<div class = "recipe-table" style="overflow:inherit">');
        $("#recipesOption #table").append(cardRecipeDiv);
        for (i = 0; i < response.hits.length; i++) {
            var cardRecipe = $('<div class = "box" id="recipeCard" class="card m-1" style="width: 18rem; float:left; background-color: #fff;">');
            var recipeImg = $('<img src="' + response.hits[i].recipe.image + '" alt="' + response.hits[i].recipe.label + '"class="card-img-top">');
            var modalImg = $('<img src="' + response.hits[i].recipe.image + '" alt="' + response.hits[i].recipe.label + '"style="width:250px"">');
            var recipeBody = $('<div class="card-body">');
            var recipeTitle = $('<h1 class="card-title">' + response.hits[i].recipe.label + '</h1>');
            var modalTitle = $('<h1 class="card-title">' + response.hits[i].recipe.label + '</h1>');
            var recipeCal = $('<h2 class="card-title">Calories: ' + Math.round(response.hits[i].recipe.calories) + '</h2>');
            var modalCal = $('<h2 class="card-title">Calories: ' + Math.round(response.hits[i].recipe.calories) + '</h2>');
            var recipeButton = $('<button class="btn btn-primary recipe-click-button" type="button">More Details</button>');
            var recipeContent = $('<div class="card-body recipe-details">');
            var recipehealth = $('<h5>Health Label: ' + response.hits[i].recipe.healthLabels + '</h5>');
            var recipeIngredients = $('<p>Ingredients: ' + response.hits[i].recipe.ingredientLines + '</p>');
            var modalButton = $('<a href="' + response.hits[i].recipe.url + '" target="_blank"><button class="btn btn-primary modal-more-info" type="button">More Info</button></a>');
            $(cardRecipeDiv).append(cardRecipe);
            $(cardRecipe).append(recipeImg);
            $(cardRecipe).append(recipeBody);
            $(recipeBody).append(recipeTitle);
            $(recipeBody).append(recipeCal);
            $(recipeBody).append(recipeButton);
            $(recipeButton).append(recipeContent);
            $(recipeContent).append(modalTitle);
            $(recipeContent).append(modalImg);
            $(recipeContent).append(modalCal);
            $(recipeContent).append(recipehealth);
            $(recipeContent).append(recipeIngredients);
            $(recipeContent).append(modalButton);
        }
    });
}

function loadData() {
    console.log($("#recipesOption #table"));

    
    $("#recipesOption #table").hide();
   $("#recipesOption #table").before('<div class="loader">');
    

}

function setMasonry() {
    setTimeout(function () {
        $(".loader").remove();
        $("#recipesOption #table").fadeIn(300);
        $('.recipe-table').masonry({
            itemSelector: '.box',
        });
    }, 5000);
}

$(document).on('click', '.recipe-click-button', function () {
    var theGoodStuff = $(this).find('.recipe-details')
    $.magnificPopup.open({
        items: {
            src: theGoodStuff,
        },
        type: 'inline'
    });
});






