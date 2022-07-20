getCartItems();

const cartBody = document.querySelector('.cart-body');

document.addEventListener("click", function(e){
    if (e.target && e.target.classList.contains('btn-delete')){
        e.preventDefault();
        removeCartItem(e);
    } else if (e.target && e.target.classList.contains('btn-uparrow')) {
        e.preventDefault();
        changeItemQuantity();
    }

})

async function removeCartItem(e) {
    let cartItemId = e.target.parentElement.parentElement.querySelector('.cart-id').innerText;
    let email = localStorage.getItem("email");

    $.ajax({
        type : "DELETE",
        contentType : "application/json",
        url : "api/v1/sgcooks/cart/removeItem/" + cartItemId + "?email=" + email,
        //data : JSON.stringify(formData),
        dataType : 'text',
        success : function(result) {

            console.log(result);
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

async function getCartItems() {
    console.log("test");
    let email = "novia@gmail.com"; //temp variable, has to be dynamic
    $.ajax({
        type : "GET",
        url : "api/v1/sgcooks/cart/?email="+ email,
        dataType : 'json',
        success : async function (result) {
            console.log(result);

            let cartItems = result;

            let size = cartItems.length;

            let generatedHTML = "";

            for (var i = 0; i < size; i++) {
                let recipeId = cartItems[i].productId;
                const url1 = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

                const response1 = await fetch(url1);
                const data = await response1.json();
                let price = Math.floor((Math.random() * 20) + 10);

                generatedHTML += `
                    <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                      <div class="mr-1"><img class="rounded" src="${data.image}" width="70"></div>
                      <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${data.title}</span>
                          <div class="d-flex flex-row product-desc">
                              <div class="color" style="margin-right: 10px;"><span class="text-grey">Product ID:</span><span class="font-weight-bold">${recipeId}</span></div>
                              <div class="color"><span class="text-grey">Cart ID:</span><span class="font-weight-bold">${cartItems[i].id}</span></div> <!-- REMEMBER to hide cartID-->
                          </div>
                      </div>
                      <div class="d-flex flex-row align-items-center qty">
                          <input id="quantity" type="number" value ="1" class="form-control quantity-input" style="margin-right: 20px;">
                      </div>
                      <div>
                          <h5 class="text-grey"> $${price}.00</h5>
                      </div>
    
                      <div class="d-flex align-items-center" role = "button"><i class="fa fa-trash mb-1 text-danger"></i></div>
                  </div>
               `;
            } // keys for cart items; productid , email ; store both cartId and productId
            console.log(generatedHTML)
            cartBody.innerHTML = generatedHTML;
        },
        error : function(e) {
            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    });


}

async function changeItemQuantity(e) {
    let email = localStorage.getItem("email");
    let cartItemId = e.target.parentElement.parentElement.querySelector('.cart-id').innerText;
    let quantity = e.target.parentElement.parentElement.querySelector('.quantity').innerText;

    $.ajax({
        type : "PUT",
        contentType : "application/json",
        url : "api/v1/sgcooks/cart/changeCartItemQuantity?email=" + email + "&cartItemId=" + cartItemId + "&quantity=" + quantity,
        //data : JSON.stringify(formData),
        dataType : 'text',
        success : function(result) {


            console.log(result);
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}
