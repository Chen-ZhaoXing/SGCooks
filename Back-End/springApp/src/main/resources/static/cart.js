getCartItems();

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
        success : function(result) {
            console.log(result);

            let cartItems = result;

            let size = cartItems.length;

            let generatedHTML = "";

            for (var i = 0; i < size; i++) {


                generatedHTML += `
    
    `;
            } // keys for cart items; productid , email ; store both cartId and productId
            searchResultDiv.innerHTML = generatedHTML;
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
