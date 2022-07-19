getCartItems();

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

