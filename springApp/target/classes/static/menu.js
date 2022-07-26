const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const ingredientsAccordian = document.querySelector('.ingredients-item');

const chineseFilter = document.querySelector('.chinese');

const container = document.querySelector('.container');
let searchQuery = '';
const apiKey = "a52cf0e44bf14b7e96aa72e6807e0bf0";

/* Alternatte API keys for spoonacular API
693d8ac79dcc44fbb0536b51643ee240
02b6ed3072c94a119a77ae6a1155edb5
f4a4c702a03b4236807d9a23325cf6f5
a52cf0e44bf14b7e96aa72e6807e0bf0
 */


/* 
-----------------------------------------------------------------------------------------------------------------------
GENERATE RECIPES UPON GOING TO MENU.HTML
-----------------------------------------------------------------------------------------------------------------------
*/

allRecipes();

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
            <a href="#" class="btn-addtocart" id="addToCart">Add to Cart</a>
<!--        <button id="addToCart" type="button" class="btn-addtocart">-->
<!--            Add to Cart</button>-->
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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


/* 
-----------------------------------------------------------------------------------------------------------------------
GENERATING RECIPES BASED ON SEARCH
-----------------------------------------------------------------------------------------------------------------------
*/

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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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


/* 
-----------------------------------------------------------------------------------------------------------------------
GENERATING RECIPES BASED ON FILTER BUTTONS 
-----------------------------------------------------------------------------------------------------------------------
*/

// FILTER BASED ON CUISINE

document.addEventListener("click", function(e){

  console.log("hello3");

  if (e.target && e.target.classList.contains('chinese')){
    e.preventDefault();
    searchChineseRecipes();
  } else if (e.target && e.target.classList.contains('indian')){
    e.preventDefault();
    searchIndianRecipes();
  } else if (e.target && e.target.classList.contains('korean')){
    e.preventDefault();
    searchKoreanRecipes();
  } else if (e.target && e.target.classList.contains('thai')){
    e.preventDefault();
    searchThaiRecipes();
  } else if (e.target && e.target.classList.contains('viet')){
    e.preventDefault();
    searchVietRecipes();
  } else if (e.target && e.target.classList.contains('european')){
    e.preventDefault();
    searchEuropeanRecipes();
  }

})


async function searchChineseRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?cuisine=Chinese&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div>
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
  console.log("end");
        
}

async function searchIndianRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?cuisine=Indian&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
               <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div>
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
  console.log("end");
        
}

async function searchThaiRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?cuisine=Thai&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div>
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
  console.log("end");
        
}

async function searchVietRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?cuisine=Vietnamese&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}

async function searchKoreanRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?cuisine=Korean&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}

async function searchEuropeanRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?cuisine=European&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div>  
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
  console.log("end");
        
}

// FILTER BASED ON DIET

document.addEventListener("click", function(e){

  if (e.target && e.target.classList.contains('paleo')){
    e.preventDefault();
    searchPaleoRecipes();
  } else if (e.target && e.target.classList.contains('vegan')){
    e.preventDefault();
    searchVeganRecipes();
  } else if (e.target && e.target.classList.contains('veg')){
    e.preventDefault();
    searchVegRecipes();
  } else if (e.target && e.target.classList.contains('keto')){
    e.preventDefault();
    searchKetoRecipes();
  } else if (e.target && e.target.classList.contains('glutenfree')){
    e.preventDefault();
    searchGlutenFreeRecipes();
  } else if (e.target && e.target.classList.contains('whole30')){
    e.preventDefault();
    searchWhole30Recipes();
  }
})

async function searchPaleoRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?diet=Paleo&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}

async function searchVeganRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?diet=Vegan&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}

async function searchVegRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?diet=Vegetarian&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}

async function searchKetoRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?diet=Ketogenic&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}

async function searchGlutenFreeRecipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?diet=GlutenFree&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}

async function searchWhole30Recipes(e){

  const baseURL = `https://api.spoonacular.com/recipes/complexSearch?diet=Whole30&apiKey=${apiKey}`;
  console.log('yay');
  const response = await fetch(baseURL);
  const data = await response.json(); // convert response into json
  console.log(data);
  
  let generatedHTML = "";
  var arrLen = data.results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
    <div class="card" style="width: 400px; border-radius: 20px; padding-bottom: 20px;">
      <img class="card-img-top" src="${data.results[i].image}" alt="Card image cap" style = "height: 300px; width: 350px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.results[i].title}</h5>
        <h9 class="recipe-id" style = "color: white;">${data.results[i].id}</h9>
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
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </div> 
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
  console.log("end");
        
}


/* 
----------------------------------------------------------------------------------------
GENERATING RECIPE POP-UP
----------------------------------------------------------------------------------------
*/


document.addEventListener("click", function(e){
  if (e.target && e.target.classList.contains('btn-viewrecipe')){
    e.preventDefault();
    getMealRecipe(e);
  } else if(e.target && e.target.classList.contains('btn-addtocart')) {
      e.preventDefault();
      addToCart(e);
  }
})


const blobToBase64 = blob => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const convertBlobToBase64 = async (blob) => {
  return await blobToBase64(blob);
}

async function addToCart(e){
  let recipeId = e.target.parentElement.parentElement.querySelector('.recipe-id').innerText; // !!! retrieves the value from the search bar
  console.log(recipeId);

  let email = localStorage.getItem("email");

  $.ajax({
    type : "POST",
    contentType : "application/json",
    url : "api/v1/sgcooks/cart/addItem?email=" + email + "&productId=" + recipeId + "&quantity=1",
    //data : JSON.stringify(formData),
    dataType : 'json',
    success : function(result) {
      // if (result.status == "success") {
      //     $("#postResultDiv").html(
      //         "" + result.data.bookName
      //         + "Post Successfully! <br>"
      //         + "---> Congrats !!" + "</p>");
      // } else {
      //     $("#postResultDiv").html("<strong>Error</strong>");
      // }
      Swal.fire({
        // position: 'center',
        icon: 'success',
        title: 'Your item has been added!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(result);
    },
    error : function(e) {
      alert("Error!")
      console.log("ERROR: ", e);
    }
  });
}

async function getMealRecipe(e){
      let recipe= e.target.parentElement.parentElement;
      console.log(recipe)
      let recipeId = e.target.parentElement.parentElement.querySelector('.recipe-id').innerText; // !!! retrieves the value from the search bar
      console.log(recipeId);
      const url1 = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
      const url2 = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.png&apiKey=${apiKey}`;

      const response1 = await fetch(url1);
      const data = await response1.json();
      console.log('success1');

      const response2 = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.png?measure=metric&apiKey=${apiKey}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'image/png',
            'Content-Type': 'image/png'
          }
        }
      );
      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }


      const data2 = await response2.blob();
      console.log('success2');
      const temp1 =  await convertBlobToBase64(data2);

      //

      const response3 = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/equipmentWidget.png?measure=metric&apiKey=${apiKey}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'image/png',
            'Content-Type': 'image/png'
          }
        }
      );
      if (!response3.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }

      const data3 = await response3.blob();
      console.log('success2');
      const temp2 =  await convertBlobToBase64(data3);


      recipeModal = document.getElementById('recipe-details');


      let generatedHTML = "";

        generatedHTML += ` 
          <!-- Modal -->
                  <img src="${data.image}" alt="..." style = "height: 300px; width: 400px; object-fit: contain;">
                  <div class="card-body">
                    <div class="card-text" >
                      <h2 class = "recipe-title">${data.title}</h2>
                          <p class = "recipe-category" style = "font-size: 18px;"><b>Preparation Time:</b> ${data.readyInMinutes} minutes</p>
                          <p class = "recipe-category" style = "font-size: 18px;"><b>Yields:</b> ${data.servings} servings </p>
                          <p class = "recipe-category" style = "font-size: 18px;"><b>Price:</b> $ ${(data.pricePerServing / 100).toFixed(2)}</p>
                          <div class = "recipe-instruct">
                          <div class="accordion accordion-flush" id="accordionFlushExample">
                          <div class="accordion-item instructions-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Instructions
                              </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body" style = "font-size:20px;">${data.instructions}</div>
                            </div>
                          </div>
                          <div class="accordion-item ingredients-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Ingredients
                              </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">
                                <img src="${temp1}" alt="">
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item equipment-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Equipment
                              </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">
                                <img src="${temp2}" alt="">
                              </div>
                            </div>
                          </div>
                        </div>
                          </div>
                          <div class = "recipe-link">
                            <a href = "https://www.youtube.com/watch?v=GA-fCgJykEw" target = "_blank">Watch Video</a>
                          </div> 
                    </div>
      `
    
      recipeModal.innerHTML = generatedHTML;
}




















