GET: $(document).ready(
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
		})