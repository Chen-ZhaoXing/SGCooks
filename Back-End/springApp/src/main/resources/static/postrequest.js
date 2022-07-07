$(document).ready(
		function() {

			// SUBMIT FORM
			$("#bookForm").submit(function(event) {
				// Prevent the form from submitting via the browser.
				event.preventDefault();
				ajaxPost();
			});

			function ajaxPost() {

				// PREPARE FORM DATA
				var formData = {
					firstName : $("#bookId").val(),
					lastName : $("#bookName").val(),
					email : $("#author").val(),
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