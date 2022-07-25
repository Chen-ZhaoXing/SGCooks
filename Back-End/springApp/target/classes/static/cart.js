getCartItems();

const cartBody = document.querySelector('.cart-body');
const cartFooter = document.querySelector('.cart-footer');

document.addEventListener("click", function(e){
    if (e.target && e.target.classList.contains('btn-delete')){
        e.preventDefault();
        removeCartItem(e);
    }

})

document,addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains('quantity-change')){
        e.preventDefault();
        let cartItemId = e.target.parentElement.parentElement.querySelector('.cart-id').innerText;
        let quantity = e.target.parentElement.parentElement.querySelector('.quantity-change').value;
        console.log(cartItemId);
        console.log(quantity);
        changeItemQuantity(e,cartItemId,quantity);
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
            window.location.replace("http://localhost:8080/cart");
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

async function getCartItems() {
    console.log("test");
    let email = localStorage.getItem("email"); //temp variable, has to be dynamic
    $.ajax({
        type : "GET",
        url : "api/v1/sgcooks/cart/?email="+ email,
        dataType : 'json',
        success : async function (result) {
            console.log(result);

            let cartItems = result;

            let size = cartItems.length;

            if(size === 0){
                cartBody.innerHTML = "<div class=\"d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded\" style=\"box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\">\n" +
                    "                You Have No Item In Your Cart!\n" +
                    "            </div>          \n" +
                    "            <div class=\"d-flex flex-row align-items-center mt-3 p-2 bg-white rounded\">\n" +
                    "              <button class=\"btn btn-dark btn-block btn-lg ml-2 backtoshopping-button\" type=\"button\" style=\"margin-right: 20px;\" onclick = \"location.href = 'menu'\">Back to Shopping</button>\n" +
                    "            </div>"
                return
            }

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
                              <div class="color"><span class="text-grey">Cart ID:</span><span class="font-weight-bold cart-id">${cartItems[i].id}</span></div> <!-- REMEMBER to hide cartID-->
                          </div>
                      </div>
                      <div class="d-flex flex-row align-items-center qty">
<!--                          <input id="quantity" type="number" value ="1" class="form-control quantity-input" style="margin-right: 20px;">-->
                            <select class="form-control quantity-change" id="exampleFormControlSelect1">
                                  <option hidden>${cartItems[i].quantity}</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                            </select>
                      </div>
                      <div>
                          <h5 class="text-grey"> $${price}.00</h5>
                      </div>
    
                      <div class="d-flex align-items-center" role = "button"><i class="fa fa-trash mb-1 text-danger btn-delete"></i></div>
                  </div>
               `;
                console.log(i);
            } // keys for cart items; productid , email ; store both cartId and productId
            console.log(generatedHTML)
            generatedHTML += "<div class=\"d-flex flex-row align-items-center mt-3 p-2 bg-white rounded\">\n" +
                "              <button class=\"btn btn-dark btn-block btn-lg ml-2 backtoshopping-button\" type=\"button\" style=\"margin-right: 20px;\" onclick = \"location.href = 'menu'\">Back to Shopping</button>\n" +
                "              <button class=\"btn btn-dark btn-block btn-lg ml-2 pay-button \" type=\"button\" onclick = \"location.href = 'page-checkout'\" >Proceed to Pay</button>\n" +
                "            </div>\n" +
                "            \n" +
                "        </div>"
            cartBody.innerHTML = generatedHTML;

        },
        error : function(e) {
            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    });


}

async function changeItemQuantity(e, cartId, quantity) {
    let email = localStorage.getItem("email");

    console.log(quantity);

    $.ajax({
        type : "PUT",
        contentType : "application/json",
        url : "api/v1/sgcooks/cart/changeCartItemQuantity?email=" + email + "&cartItemId=" + cartId + "&quantity=" + quantity,
        //data : JSON.stringify(formData),
        dataType : 'text',
        success : function(result) {


            console.log(quantity);
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}
