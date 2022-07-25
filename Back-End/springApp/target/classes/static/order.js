getOrders();

const orderBody = document.querySelector('.order-body');

document.addEventListener("click", function(e){
    if (e.target && e.target.classList.contains('btn-checkout')){
        e.preventDefault();
        orderPost(e);
    }

})

async function orderPost(e) {

    let email = localStorage.getItem("email"); //temp variable, has to be dynamic
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
    let email = localStorage.getItem("email"); //temp variable, has to be dynamic
    $.ajax({
        type: "GET",
        url: "api/v1/sgcooks/order/?email=" + email,
        success: async function (result) {
            console.log(result);

            let order = result;

            let size = order.length;

            let generatedHTML = "";

            for (var i = 0; i < size; i++) {

                let number_of_recipes = order[i].orderItems.length;

                let orderId = order[i].id;

                generatedHTML += `<div><h1 class="text-black" style="margin: 10px;"> Order No: ${orderId}</h1></div>`;

                for (var j = 0; j < number_of_recipes ; j++) {
                    let recipeId = order[i].orderItems[j].productId;
                    const url1 = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

                    const response1 = await fetch(url1);
                    const data = await response1.json();

                    console.log(recipeId);
                    console.log(data.title);

                    generatedHTML += `
                     <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        <div class="mr-1"><img class="rounded" src="${data.image}" width="70"></div>
                        <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${data.title}</span>
                            <div class="d-flex flex-row product-desc">
                            </div>
                        </div>
                        <div>
                          <h5 class="text-grey" style="margin-right: 10px;">${order[i].createdDate.substring(0,10)}</h5>
                      </div>
                      <div>
                  <button type="button" class="btn-brand navbar-right-btn" onclick = "location.href = 'orders'" style = "margin-right: 30px;">
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </button>  
                </div>
                    </div>
    
                `;
                }

            } // keys for orders: productid , email ; store both cartId and productId
            console.log(generatedHTML)
            orderBody.innerHTML = generatedHTML;

        },
        error: function (e) {
            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    });


}

