const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const ingredientsAccordian = document.querySelector('.ingredients-item');

const container = document.querySelector('.container');
let searchQuery = '';
const apiKey = "f4a4c702a03b4236807d9a23325cf6f5";


// generating all recipes when u press menu.html

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

const encodeBase64 = (data) => {
  return Buffer.from(data).toString('base64');
}

function toBase64(dataArr){
  return btoa(dataArr.reduce((data, val)=> {
    return data + String.fromCharCode(val);
  }, ''));
}

const blobToBase64 = blob => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const convertBlobToBase64 = async (blob) => {
  return await blobToBase64(blob);
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
                          <p class = "recipe-category">${data.cuisines}</p>
                          <p class = "recipe-category">Preparation Time: ${data.readyInMinutes}</p>
                          <p class = "recipe-category">Servings: ${data.servings}</p>
                          <p class = "recipe-category">Price: ${data.pricePerServing / 100}</p>
                          <div class = "recipe-instruct">
                          <div class="accordion accordion-flush" id="accordionFlushExample">
                          <div class="accordion-item instructions-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Instructions
                              </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                              <div class="accordion-body">${data.instructions}</div>
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





















