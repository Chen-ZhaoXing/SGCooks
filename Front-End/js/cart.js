const { eventListeners } = require("@popperjs/core");

// delete item from cart
var removeCartItemButton = document.getElementsByClassName('btn-danger');
for (var i =  0; i < removeCartItemButton.length; i++) {
  var button = removeCartItemButton[i];
  button.addEventListener('click', function(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove(); // 3 layer of parent bc we wanna remove cart-row (be careful!)
    updateCartTotal();
  })
}




