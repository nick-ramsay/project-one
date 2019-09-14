var recipeUrl;




$(document).ready(function(){

    $(document).on("click", "#sumbit", function () {
        $("#table").empty();
        if ($("#userInput").val() !== "") {
            searchRecipe = $("#userInput").val();
        }
        recipeUrl = "https://api.edamam.com/search?q=" + searchRecipe + "&app_id=cc84332e&app_key=7305bef5a7c92a751b9bfdf0b0ef0c63&from=0&to=3&calories=591-722&health=alcohol-free";
    })
    $.ajax({
        url: recipeUrl,
        method: "GET"
      }).then(function(response) {

      });



});