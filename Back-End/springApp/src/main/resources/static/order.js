$(document).ready(
    function() {

        // Place order (NOTE Change the #placeorder accordingly
        $("#placeOrder").submit(function(event) {
            // Prevent the form from submitting via the browser.
            event.preventDefault();
            orderPost();
        });

        function orderPost() {

            // PREPARE FORM DATA
            // var formData = {
            //     email : $("#email").val() // i think this one need to extract or stored somehwere
            // };
            let email = $("#email").val();
            console.log(email);
            // DO POST
            $.ajax({
                type : "POST",
                contentType : "application/json",
                url : "api/v1/sgcooks/order/add?email=" + email,
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
                    $("#postResultDiv").html(
                        "" + result.message
                        + "Post Successfully! <br>"
                        + "---> Congrats !!" + "</p>");
                    console.log(result);
                },
                error : function(e) {
                    alert("Error!")
                    console.log("ERROR: ", e);
                }
            });

        }

        $("#getOrder").click(function(event) {
            console.log("tests");
            // Prevent the form from submitting via the browser.
            event.preventDefault();
            getOrders();
        });

        function getOrders() {
            let email = "novia@gmail.com"; //temp variable, has to be dynamic
            $.ajax({
                type : "GET",
                url : "api/v1/sgcooks/order/?email="+ email,
                success : function(result) {
                    console.log(result);

                    // if (result.status == "success") {
                    $('#getOrderDiv ul').empty();
                    $.each(result,
                        function(i,order) {
                            var orderValues = order.id + "<br>";
                            $('#getOrderDiv .list-group').append(
                                orderValues )
                        });
                    console.log("Success: ", result);

                },
                error : function(e) {
                    $("#getResultDiv").html("<strong>Error</strong>");
                    console.log("ERROR: ", e);
                }
            });

        }
    })

