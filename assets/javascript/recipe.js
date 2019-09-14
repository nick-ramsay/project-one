var recipeUrl;
var html = '<div class="col-md-12">';
html += '<div class="card">';
html += '<div class="row">';
html += '<div class="col-md-4" id="userimg"> </div>';
html += '<div class="col-md-8 px-3">';
html += '<div class="card-block px-3">';
html += '<h4 class="card-title">sometitle</h4>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';




$(document).ready(function () {

    $(document).on("click", "#sumbit", function () {
        $("#table").empty();
        if ($("#userInput").val() !== "") {
            var searchRecipe = $("#userInput").val();
        }
        recipeUrl = "https://api.edamam.com/search?q=" + searchRecipe + "&app_id=cc84332e&app_key=7305bef5a7c92a751b9bfdf0b0ef0c63&from=0&to=3&calories=591-722&health=alcohol-free";

        if ($('#recipeButton').is(':checked')) {
            $.ajax({
                url: recipeUrl,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                for (i = 0; i < response.hits.length; i++) {
                    var wrapper = $('<div class="col-md-12">');
                    var card = $('<div class="card">').appendTo(wrapper);
                    var row1 = $('<div class="row">').appendTo(card);
                    var leftCol = $('<div class="col-md-4" id="userimg">').appendTo(row1);
                    var rightCol = $('<div class="col-md-8 px-3">').appendTo(row1);
                    var decsription = $('<div class="details">').appendTo(rightCol);
                    var label = $('<h1>' + response.hits[i].recipe.label + '</h1>').appendTo(decsription);
                    var cal = $('<h2>Calories: ' + Math.round(response.hits[i].recipe.calories) + '</h2>').appendTo(label);
                    var health = $('<h5>Health Label: ' + response.hits[i].recipe.healthLabels + '</h5>').appendTo(label);
                    var row2 = $('<div class="row">').appendTo(card);
                    var col = $('<div class="col-md-12">').appendTo(row2);
                    var ingDecsription = $('<div class="ingredient">').appendTo(col);
                    var ingredient = $('<p>Ingredients : ' + response.hits[i].recipe.ingredientLines + '</p>').appendTo(ingDecsription);
    
    
    
    
                    $('<img>')
                        .width('340px')
                        .height('220px')
                        .addClass('img-fluid')
                        .attr("src", response.hits[i].recipe.image)
                        .appendTo(leftCol);
    
    
                    $("#table").append(wrapper);
                }
            });
        }
       
    });
});