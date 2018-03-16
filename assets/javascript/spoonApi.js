// key
// c4YgIGcU8WmshZ3ig1VyeaajeldQp1cNxb7jsnu5l0L2zf7GbS
//way to type multiple ingredients
// apples%2Cflour%2Csugar
// Url
//spoonacular-recipe-food-nutrition-v1.p.mashape.com
        
        
$("#recipeSearch").on("click", function(e) {
    e.preventDefault();
    
    let search = (search1 + "%2C" + search2 + "%2C" + search3 + "%2C" + search4 + "%2C" + search5);

    let queryUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags=' + search;

    // let queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/838902/nutritionWidget?defaultCss=true"
    // let queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/guessNutrition?title=Spaghetti+Aglio+et+Olio"

    $.ajax({
      url: queryUrl,
      method: "GET",
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Mashape-Key', 'c4YgIGcU8WmshZ3ig1VyeaajeldQp1cNxb7jsnu5l0L2zf7GbS');
        }
  }).then(function(response) {
    console.log(response);

    let recipes = response.recipes;
    let number = 1

    for ( let i = 0; i < response.recipes.length; i++) {
      

      // variables for cards
      let recipeTitle = recipes[i].title
      let recipeImage = recipes[i].image;
      let recipeLikes = recipes[i].aggregateLikes;
      let cookTime = recipes[i].readyInMinutes;
      let instructions = recipes[i].instructions;
      let url = recipes[i].sourceUrl;
      //loop for ingredients
      let ingredients = [];
      let ingredientsArr = recipes[i].extendedIngredients;
      let id = recipes[i].id;

      for(let n = 0; n < ingredientsArr.length; n++) {
        ingredients.push(ingredientsArr[n].name);
      }
      //variables for diets
      let diets = [];
      let dietsArr = recipes[i].diets;

      for(let j = 0; j < dietsArr.length; j++) {
        diets.push(dietsArr[j]);
      }

      database.ref("recipeCards/recipe" + number).set({
        title: recipeTitle,
        picture: recipeImage,
        likes: recipeLikes,
        time: cookTime,
        instructions: instructions,
        ingredients: ingredients,
        diets: diets,
        url: url,
        id: id
      });

      number++; 
    }
  });
});

database.ref("recipeCards").on('value', function(snapshot) {

//  let recipe1Picture = snapshot.val().recipe1.picture;
  let recipe2Picture = snapshot.val().recipe2.picture;
  let recipe3Picture = snapshot.val().recipe3.picture;
  let recipe4Picture = snapshot.val().recipe4.picture;
  let recipe5Picture = snapshot.val().recipe5.picture;
  let recipe6Picture = snapshot.val().recipe6.picture;
  let recipe7Picture = snapshot.val().recipe7.picture;
  let recipe8Picture = snapshot.val().recipe8.picture;
  let recipe9Picture = snapshot.val().recipe9.picture;

  for(let i = 1; i < snapshot.length; i++) {
    $("#basicModal-" + 1).html(snapshot.val()['recipe' + 1].title);
    $("#recipePic1").attr("src", snapshot.val()['recipe' + 1].picture);
  }
  
  
  // $("#basicModal-2").html(snapshot.val().recipe2.title);
  // $("#basicModal-3").html(snapshot.val().recipe3.title);
  // $("#basicModal-4").html(snapshot.val().recipe4.title);
  // $("#basicModal-5").html(snapshot.val().recipe5.title);
  // $("#basicModal-6").html(snapshot.val().recipe6.title);
  // $("#basicModal-7").html(snapshot.val().recipe7.title);
  // $("#basicModal-8").html(snapshot.val().recipe8.title);
  // $("#basicModal-9").html(snapshot.val().recipe9.title);

  // $("#recipePic1").attr("src", snapshot.val()['recipe' + 1].picture);
  // $("#recipePic2").attr("src", recipe2Picture);
  // $("#recipePic3").attr("src", recipe3Picture);
  // $("#recipePic4").attr("src", recipe4Picture);
  // $("#recipePic5").attr("src", recipe5Picture);
  // $("#recipePic6").attr("src", recipe6Picture);
  // $("#recipePic7").attr("src", recipe7Picture);
  // $("#recipePic8").attr("src", recipe8Picture);
  // $("#recipePic9").attr("src", recipe9Picture);
});

$(".truncate").on("click", function(e) {
  e.preventDefault();

  
})

