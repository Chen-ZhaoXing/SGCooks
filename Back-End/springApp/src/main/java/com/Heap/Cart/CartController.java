package com.Heap.Cart;

import com.Heap.Common.ApiResponse;
import com.Heap.SGCooksUser.User;
import com.Heap.SGCooksUser.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/sgcooks/cart")
public class CartController {
    private final UserService userService;
    private final CartService cartService;

    @Autowired
    public CartController(UserService userService, CartService cartService){
        this.userService =  userService;
        this.cartService = cartService;
    }

    // post cart api
    @PostMapping("/addItem")
    public ResponseEntity<ApiResponse> addToCart(@RequestParam("email") String email, @RequestParam String productId, @RequestParam Integer quantity){

        User user = (User) userService.loadUserByUsername(email);

        cartService.addToCart(user, productId, quantity);
        return new ResponseEntity<>(new ApiResponse(true, "Added to cart"), HttpStatus.CREATED);
    }

    // get all cart items for a user
    @GetMapping
    public ResponseEntity<List<Cart>> getCartItems(@RequestParam("email") String email){
        User user = (User) userService.loadUserByUsername(email);

        List<Cart> cart = cartService.getCartItems(user);
        //create a 2D array and return the 2d array or other methods
        // or use a composite primary key formed using th euser and cart ID, after they checkout the cart, remove all the cart associated with the user/
        // thus when adding to cart must add a logic verifying if
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }
    // delete an item
    @DeleteMapping("/removeItem/{cartItemId}")
    public ResponseEntity<ApiResponse> removeCartItem(@RequestParam("email") String email, @PathVariable Integer cartItemId){
        User user = (User) userService.loadUserByUsername(email);

        cartService.removeCartItem(user, cartItemId);

        return new ResponseEntity<>(new ApiResponse(true, "Item removed from cart"), HttpStatus.CREATED);
    }

    //Change product quantity
    @PutMapping("/changeCartItemQuantity")
    public ResponseEntity<ApiResponse> changeItemQuantity(@RequestParam("email") String email, @RequestParam String productID, @RequestParam Integer Quantity){

        return new ResponseEntity<>(new ApiResponse(true, "Item quantity changed"), HttpStatus.CREATED);
    }
}
