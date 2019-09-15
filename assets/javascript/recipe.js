function recipeData() {
    $("#recipesOption #table").html("");
    var searchRecipe = $("#recipesOption #userInput").val();
    var recipeUrl = "https://api.edamam.com/search?q=" + searchRecipe + "&app_id=cc84332e&app_key=7305bef5a7c92a751b9bfdf0b0ef0c63&from=0&to=20&calories=591-722&health=alcohol-free";
    $.ajax({
        url: recipeUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var cardRecipeDiv = $('<div class = "recipe-table" style="overflow:auto">');
        $("#recipesOption #table").append(cardRecipeDiv);
        for (i = 0; i < response.hits.length; i++) {
            var cardRecipe = $('<div class = "box" id="recipeCard" class="card m-1" style="width: 18rem; float:left; background-color: #fff;">');
            var recipeImg = $('<img src="' + response.hits[i].recipe.image + '" alt="' + response.hits[i].recipe.label + '"class="card-img-top">');
            var recipeBody = $('<div class="card-body">');
            var recipeTitle = $('<h1 class="card-title">' + response.hits[i].recipe.label + '</h1>');
            var recipeCal = $('<h2 class="card-title">Calories: ' + Math.round(response.hits[i].recipe.calories) + '</h2>');
            var recipeButton = $('<button class="btn btn-primary recipe-click-button" type="button" data-toggle="collapse" data-target="#recipeCollapse' + i + '" aria-expanded="false" aria-controls="collapseOne">More Details</button>');
            var recipeDiv = $('<div id="recipeCollapse' + i + '" class="collapse" aria-labelledby="headingOne" data-parent="#recipeCard">');
            var recipeContent = $('<div class="card-body">');
            var recipehealth = $('<h5>Health Label: ' + response.hits[i].recipe.healthLabels + '</h5>');
            $(cardRecipeDiv).append(cardRecipe);
            $(cardRecipe).append(recipeImg);
            $(cardRecipe).append(recipeBody);
            $(recipeBody).append(recipeTitle);
            $(recipeBody).append(recipeCal);
            $(recipeBody).append(recipeButton);
            $(recipeBody).append(recipeDiv);
            $(recipeDiv).append(recipeContent);
            $(recipeContent).append(recipehealth);

        }
    });
}

function setMasonry() {
    setTimeout(function() {
        $('.recipe-table').masonry({
        
            itemSelector: '.box',
          });
    }, 3000);
    
}


$(document).on("click", ".recipe-click-button", function () {
        setTimeout(function() {
            $('.recipe-table').masonry({
            
                itemSelector: '.box',
              });
        }, 200);
    
    });


