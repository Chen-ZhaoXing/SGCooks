const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const apiKey = "e3ffe551a5d94a358a460e7946136869";


// generating all recipes when u press menu.html

// allRecipes();

async function allRecipes() {

  const baseURL = `https://api.spoonacular.com/recipes/random?number=30&apiKey=${apiKey}`;
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json

  console.log("here2");
  console.log(data.recipes);
  
  let generatedHTML = "";
  var arrLen = data.recipes.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.recipes[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.recipes[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.recipes[i].id}</h9>
        <p class="card-text"></p>
        <a href="#" class="btn-addtocart">Add to Cart</a>
        <button class="btn-viewrecipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          View Recipe
        </button>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="recipe-details"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  }
  searchResultDiv.innerHTML = generatedHTML;

}











// generating the recipes based on search

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value; // !!! retrieves the value from the search bar
  console.log(searchQuery);
  // calling a function to fetch api
  searchRecipes();
});

async function searchRecipes() {
  // &to=20 increases the number of results we get (we can use pages!)
  const baseURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchQuery}&apiKey=${apiKey}`;
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  
  let generatedHTML = "";
  var arrLen = data.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data[i].id}</h9>
        <p class="card-text"></p>
        <a href="#" class="btn-addtocart">Add to Cart</a>
        <button class="btn-viewrecipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          View Recipe
        </button>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="recipe-details"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  }
  searchResultDiv.innerHTML = generatedHTML;
}

// generating modal with time, serving

document.addEventListener('click', function(e){
  if (e.target && e.target.classList.contains('btn-viewrecipe')){
    e.preventDefault();
    getMealRecipe(e);
  }
})

// generating modal with instructions

document.addEventListener('click', function(e){
  if (e.target && e.target.classList.contains('btn-viewrecipe')){
    e.preventDefault();
    addIngredients(e);
  }
})

async function getMealRecipe(e){
      let recipe= e.target.parentElement.parentElement;
      console.log(recipe)
      let recipeId = e.target.parentElement.parentElement.querySelector('.recipe-id').innerText; // !!! retrieves the value from the search bar
      console.log(recipeId);
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
      console.log('success');
      const response = await fetch(url);
      const data = await response.json();

      recipeModal = document.getElementById('recipe-details');
      console.log(recipeModal)

      let generatedHTML = "";

      
        generatedHTML += ` 
          <!-- Modal -->
                  <img src="${data.image}" alt="..." style = "height: 300px; width: 400px; object-fit: contain;">
                  <div class="card-body">
                    <div class="card-text" >
                      <h2 class = "recipe-title">${data.title}</h2>
                          <p class = "recipe-category">${data.cuisines}</p>
                          <p class = "recipe-category">Preparation Time: ${data.readyInMinutes}</p>
                          <p class = "recipe-category">Servings: ${data.servings}</p>
                          <p class = "recipe-category">Price: ${data.pricePerServing / 10}</p>
                          <div class = "recipe-instruct">
                            <h3>Instructions:</h3> 
                          </div>
                          <div class = "recipe-link">
                            <a href = "https://www.youtube.com/watch?v=GA-fCgJykEw" target = "_blank">Watch Video</a>
                          </div> 
                    </div>
      `
      

      recipeModal.innerHTML = generatedHTML;
}




async function addIngredients(e){
      let recipe= e.target.parentElement.parentElement;
      console.log(recipe)
      let recipeId = e.target.parentElement.parentElement.querySelector('.recipe-id').innerText; // !!! retrieves the value from the search bar
      console.log(recipeId);
      const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions&apiKey=${apiKey}`;
      console.log('success');
      const response = await fetch(url);
      const data = await response.json();

      recipeModal = document.getElementById('recipe-instruct');
      console.log(recipeModal)

      let generatedHTML = "";

      

      var len = data.length;

      for (var i = 0; i < len ; i++) {

        generatedHTML += ` 
        <p>${data.steps.step[i]}</p>
      `

      }


        
      

      recipeModal.innerHTML = generatedHTML;
}

// generating modal with ingredients



















