
document.addEventListener("click", function(e){
    if (e.target && e.target.classList.contains('btn-signIn')){
        e.preventDefault();
        loginPost(e);
    }
})

async function loginPost(e) {

    var formData = {
        username : $("#floatingInput").val(),
        password : $("#floatingPassword").val(),
    }
    console.log(formData);
    // DO POST
    $.ajax({
        type: "POST",
        url: "api/v1/login",
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        data : formData,
        dataType: 'json',
        success: function (result) {
            console.log(result.access_token);
            window.location.replace("http://localhost:8080/menu"); //if security is implemented need to maybe run another function to send the access token to authorise login
            window.localStorage.setItem("accessToken", result.access_token);
            window.localStorage.setItem("email", formData.username);
        },
        error: function (e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });

}