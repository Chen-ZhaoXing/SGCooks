package com.Heap.Cart;

import com.Heap.SGCooksUser.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

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
}
