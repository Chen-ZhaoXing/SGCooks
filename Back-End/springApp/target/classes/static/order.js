getOrders();

async function orderPost(e) {

    let email = $("#email").val();
    console.log(email);
    // DO POST
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "api/v1/sgcooks/order/add?email=" + email,
        //data : JSON.stringify(formData),
        dataType: 'json',
        success: function (result) {
            $("#postResultDiv").html(
                "" + result.message
                + "Post Successfully! <br>"
                + "---> Congrats !!" + "</p>");
            console.log(result);
        },
        error: function (e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });

}


async function getOrders() {
    let email = "novia@gmail.com"; //temp variable, has to be dynamic
    $.ajax({
        type: "GET",
        url: "api/v1/sgcooks/order/?email=" + email,
        success: function (result) {
            console.log(result);

            let orderItems = result;

            let size = orderItems.length;

            let generatedHTML = "";

            for (var i = 0; i < size; i++) {


                generatedHTML += `
    
    `;
            } // keys for orders: productid , email ; store both cartId and productId
            searchResultDiv.innerHTML = generatedHTML;

        },
        error: function (e) {
            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    });


}

