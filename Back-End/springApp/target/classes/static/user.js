$(document).ready(
		function() {
			// GET REQUEST
			$("#getAllUsers").click(function(event) {
				console.log("test");
				event.preventDefault();
				ajaxGet();
			});

			// DO GET
			function ajaxGet() {
				console.log("test2");
				$.ajax({
					type : "GET",
					url : "api/v1/sgcooks/users",
					success : function(result) {
						console.log(result);

						// if (result.status == "success") {
							$('#getResultDiv ul').empty();
							$.each(result,
									function(i,user) {
										var userValues = user.email + "<br>";
										$('#getResultDiv .list-group').append(
											userValues )
									});
							console.log("Success: ", result);
						// } else {
						// 	$("#getResultDiv").html("<strong>Error</strong>");
						// 	console.log("Fail: ", result);
						// }
					},
					error : function(e) {
						$("#getResultDiv").html("<strong>Error</strong>");
						console.log("ERROR: ", e);
					}
				});
			}

			$("#registerUser").submit(function(event) {
				// Prevent the form from submitting via the browser.
				event.preventDefault();
				ajaxPost();
			});

			function ajaxPost() {

				// PREPARE FORM DATA
				var formData = {
					firstName : $("#firstName").val(),
					lastName : $("#lastName").val(),
					email : $("#userEmail").val(),
					password: $("#password").val()
				}

				// DO POST
				$.ajax({
					type : "POST",
					contentType : "application/json",
					url : "api/v1/registration",
					data : JSON.stringify(formData),
					dataType : 'text',

					success : function(result) {
						console.log(result);
						// if (result.status == "success") {
						$("#postResultDiv").html(
							"" + result
							+ "Post Successfully! <br>"
							+ "---> Congrats !!" + "</p>");
						// } else {
						// 	$("#postResultDiv").html("<strong>Error</strong>");
						// }
						// console.log(result);
					},
					error : function(e) {
						alert("Error!")
						console.log("ERROR: ", e);
					}
				});

			}
		})