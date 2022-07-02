package com.Heap.Cart;

import com.Heap.Common.ApiResponse;
import com.Heap.SGCooksUser.User;
import com.Heap.SGCooksUser.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        //either capture users here or in cartservice
        User user = (User) userService.loadUserByUsername(email);

        cartService.addToCart(user, productId, quantity);
        return new ResponseEntity<>(new ApiResponse(true, "Added to cart"), HttpStatus.CREATED);
    }

//    // get all cart items for a user
//    @GetMapping
//    public ResponseEntity<ApiResponse> getCartItems(@RequestParam("email") String email){
//
//        return new ResponseEntity<>(new ApiResponse(true, "Added to cart"), HttpStatus.CREATED);
//    }
//    // delete a cart
//    @DeleteMapping("/removeItem")
//    public ResponseEntity<ApiResponse> getCartItems(@RequestParam("email") String email, @RequestBody String productID){
//
//        return new ResponseEntity<>(new ApiResponse(true, "Added to cart"), HttpStatus.CREATED);
//    }

    //Change product quantity
}
