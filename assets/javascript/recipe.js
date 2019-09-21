var mealDiet;
var mealType;

// $(document).on("click", ".diet", function () {
//     mealDiet = $(this).attr("data-diet");
// }) 

// $(document).on("click", ".meal-type", function () {
//     mealType = $(this).attr("data-meal");
// }) 

function recipeData() {
    mealDiet = $(".diet").attr("data-diet");
    mealType = $(".meal-type").attr("data-meal");
    $("#recipesOption #table").html("");
    var searchRecipe = $("#recipesOption #recipeInput").val();
    var recipeUrl = "https://api.edamam.com/search?q=" + searchRecipe + "&app_id=cc84332e&app_key=7305bef5a7c92a751b9bfdf0b0ef0c63&from=0&to=15&calories=591-722&health=" + mealDiet + "&mealtype=" + mealType;
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
            var recipeTitle = $('<h5 class="card-title">' + response.hits[i].recipe.label + '</h5>');
            var modalTitle = $('<h1 class="card-title resultName">' + response.hits[i].recipe.label + '</h1>');
            var recipeCal = $('<p><span>Calories: ' + Math.round(response.hits[i].recipe.calories) + '</span></p>');
            var modalCal = $('<h3 class="card-title">Calories: ' + Math.round(response.hits[i].recipe.calories) + '</h3>');
            var recipeButton = $('<button class="btn btn-warning recipe-click-button" type="button">More Details</button>');
            var recipeContent = $('<div class="card-body recipe-details">');
            var recipehealth = $('<h5 class="modalHealth">Health Label: ' + response.hits[i].recipe.healthLabels + '</h5>');
            var recipeIngredients = $('<p class="modalIngredients">Ingredients: ' + response.hits[i].recipe.ingredientLines + '</p>');
            var modalButton = $('<a href="' + response.hits[i].recipe.url + '" target="_blank"><button class="btn btn-warning modal-more-info" type="button">More Info</button></a>');
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
    $("#recipesOption #table").hide();
    $("#recipesOption #table").before('<div class="loader">');
}

function setMasonry() {
    setTimeout(function () {
        $(".loader").remove();
        $("#recipesOption #table").fadeIn(500);
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







