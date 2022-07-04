const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const apiKey = "e2673a0426c64d19a21404353defe408";


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value; // !!! retrieves the value from the search bar
  console.log(searchQuery);
  // calling a function to fetch api
  searchRecipes();
});

// fetching API function (async)
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
        <h9 class="recipe-id" style = "color: grey;">${data[i].id}</h9>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn-addtocart">Add to Cart</a>
        <button class="btn-viewrecipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          View Recipe
        </button>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Creamy Pumpkin Soup</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
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

const recipeDetailsBtn = document.getElementsByClassName('btn-viewrecipe');
console.log(recipeDetailsBtn);
var recipe_len = recipeDetailsBtn.length;
const recipeModal = document.querySelector('.recipe-details');

for (var i = 0; i < recipe_len; i++) {

  recipeDetailsBtn[i].addEventListener('click', (e) => {
    console.log('in');
    e.preventDefault();
    
    let recipeId = e.target.parentElement.parentElement.querySelector('recipe-id').value; // !!! retrieves the value from the search bar
    console.log(recipeId);
  
    getMealRecipe();
  });

}

// recipeDetailsBtn.addEventListener('click', (e) => {
//   console.log('in');
//   e.preventDefault();
  
//   let recipeId = e.target.parentElement.parentElement.querySelector('recipe-id').value; // !!! retrieves the value from the search bar
//   console.log(recipeId);

//   getMealRecipe();
// });

async function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('btn-viewrecipe')){
      let recipe= e.target.parentElement.parentElement;
      console.log(recipe);
      const url = `https://api.spoonacular.com/recipes/${recipe.id}/information&apiKey=${apiKey}`;
      console.log('success');
      const response = await fetch(url);
      const data = await response.json();
      let generatedHTML = "";
      generatedHTML += ` 
  
          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content" id = "modal-content">
                <div class="modal-header" >
                  <h5 class="modal-title" id="staticBackdropLabel" style = "text-align: center;">Creamy Pumpkin Soup</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id = "recipe-details"> 
                  <img src="assets/img/menu/pumpkinsoup.jpg" class="card-img-top" alt="..." style = "height: 300px; width: 400px; object-fit: cover;">
                  <div class="card-body">
                    <div class="card-text" >
                      <h2 class = "recipe-title">Creamy Pumpkin Soup</h2>
                          <p class = "recipe-category">Vegeterian, Soup, Lunch, Dinner</p>
                          <div class = "recipe-instruct">
                            <h3>Instructions:</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo blanditiis quis accusantium natus! Porro, reiciendis maiores molestiae distinctio veniam ratione ex provident ipsa, soluta suscipit quam eos velit autem iste!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquam voluptatibus ad obcaecati magnam, esse numquam nisi ut adipisci in?</p>
                          </div>
                          <div class = "recipe-link">
                            <a href = "https://www.youtube.com/watch?v=GA-fCgJykEw" target = "_blank">Watch Video</a>
                          </div> 
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <p>$7.20</p>
                  <a href="#" class="btn-addtocart">Add to Cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      `
      recipeModal.innerHTML = generatedHTML;

  }
}


let addToCartBtns = document.querySelectorAll('.btn-addtocart');
let cartItems = [
  {
    name: 'Creamy Pumpkin Soup',
    price: '$20.00',
    inCart: 0
  },
  {
    name: 'Stuffed Egg Plant',
    price: '$20.00',
    inCart: 0
  }
]

for (let i = 0; i < addToCartBtns.length; i++) {
  console.log("my loop");

  addToCartBtns[i].addEventListener('click', () => {
    cartCount();
  })

}

function cartCount() {
  let totalItems = localStorage.getItem('cartCount');
  totalItems = parseInt(totalItems);

  if (totalItems) {
    localStorage.setItem('cartCount', totalItems + 1);
  } else {
    localStorage.setItem('cartCount', 1);
    document.querySelector('')
  }

}








