const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
// const appId = '8e202a36';
const apiKey = "e2673a0426c64d19a21404353defe408";
const baseURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchQuery},flour,sugar&apiKey=${apiKey}`;  // use back ticks (this format is very imp!)

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

  generateHTML(data); // pass the hits only!
  
}

// if u inspect the page, u can see that each hit has image, healthlabels, etc

function generateHTML(results) {
  container.classList.remove("initial"); // changes to the other html page!
  
  let generatedHTML = "";
  var arrLen = results.length;
  for (var i = 0; i < arrLen; i++) {
    generatedHTML += `
    <div class = "col-12 col-md-6 col-lg-4">
            <div class="card" style="width: 20rem; border-radius: 20px; padding-bottom: 20px;">
              <img class="card-img-top" src="${results[i].image}" alt="Card image cap" style = "height: 300px; width: 200px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">${results[i].title}</h5>
                <a href="#" class="btn-addtocart">Add to Cart</a>
              </div>
            </div>
          </div> 
    `;
  }
  searchResultDiv.innerHTML = generatedHTML;
}







