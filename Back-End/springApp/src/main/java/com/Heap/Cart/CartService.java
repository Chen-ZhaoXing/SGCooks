package com.Heap.Cart;

import com.Heap.Exceptions.CustomException;
import com.Heap.SGCooksUser.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public void addToCart(User user, String productId, Integer quantity) {

        Cart cart = new Cart();
        cart.setProductId(productId); //this will change
        cart.setUser(user);
        cart.setQuantity(quantity); // pass quantity and product ID together
        cart.setCreatedDate(new Date());

        cartRepository.save(cart);
    }

    public List<Cart> getCartItems(User user) {
        return cartRepository.findByUser(user);
    }

    public void removeCartItem(User user, Integer cartItemId){

        Optional<Cart> optionalCart = cartRepository.findById(cartItemId);

        if (optionalCart.isEmpty()){
            throw new CustomException("Cart item id is invalid: " + cartItemId);
        }

        Cart cart = optionalCart.get();

        if (cart.getUser() != user){
           throw new CustomException("cart item id does not belong to user: " + cartItemId);
        }

        cartRepository.delete(cart);
    }


}
