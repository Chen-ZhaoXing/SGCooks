
document.addEventListener("click", function(e){
    if (e.target && e.target.classList.contains('btn-signup')){
        e.preventDefault();
        signUpPost(e);
    }
})

async function signUpPost(e) {

    var formData = {
        "firstName" : $("#floatingName").val(),
        "lastName" : $("#floatingName").val(),
        "email" : $("#floatingEmail").val(),
        "password": $("#floatingPassword").val()
    }

    if (formData.password !== $("#floatingRepeatPassword").val()){
        console.log("Password not the same");
        return;
    }
    console.log(JSON.stringify(formData));
    // DO POST
    $.ajax({
        type: "POST",
        url: "api/v1/registration",
        contentType : "application/json",
        data : JSON.stringify(formData),
        dataType: 'text',
        success: function (result) {
            console.log(result);
            window.location.replace("http://localhost:8080/login"); //if security is implemented need to maybe run another function to send the access token to authorise login
        },
        error: function (e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });

}