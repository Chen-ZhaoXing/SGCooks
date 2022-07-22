getOrders();

const orderBody = document.querySelector('.order-body');

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
        success: async function (result) {
            console.log(result);

            let order = result;

            let size = order.length;

            let generatedHTML = "";

            for (var i = 0; i < size; i++) {
                let recipeId = order[i].orderItems[i].productId;
                const url1 = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

                const response1 = await fetch(url1);
                const data = await response1.json();
                let price = Math.floor((Math.random() * 20) + 10);

                console.log(recipeId);
                console.log(data.title);

                generatedHTML += `
                     <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        <div class="mr-1"><img class="rounded" src="assets/img/chicken_soup.jpg" width="70"></div>
                        <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${data.title}</span>
                            <div class="d-flex flex-row product-desc">
                                <div class="color" style="margin-right: 10px;"><span class="text-grey">Product ID:</span><span class="font-weight-bold">1234</span></div>
                                <div class="color"><span class="text-grey">Cart ID:</span><span class="font-weight-bold">1234</span></div>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center qty">
                                <input id="quantity" type="number" value ="1" class="form-control quantity-input" style="margin-right: 20px;">
                        </div>
                        <div>
                            <h5 class="text-grey">$20.00</h5>
                        </div>
                        
                        <div>
                          <h5 class="text-grey">20/07/2022</h5>
                      </div>
                    </div>
    
                `;
            } // keys for orders: productid , email ; store both cartId and productId
            orderBody.innerHTML = generatedHTML;

        },
        error: function (e) {
            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    });


}

