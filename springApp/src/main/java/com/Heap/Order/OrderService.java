package com.Heap.Order;

import com.Heap.Cart.Cart;
import com.Heap.Cart.CartService;
import com.Heap.SGCooksUser.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    OrderItemsService orderItemsService;

    public void placeOrder(User user){
        List<Cart> cartItems = cartService.getCartItems(user);

        int orderId = orderRepository.save(new Order(user)).getId();

        for (Cart cartItem : cartItems) {
            OrderItem orderItem = new OrderItem(
                    orderId,
                    cartItem.getProductId(),
                    cartItem.getQuantity());
            orderItemsService.addOrderedProducts(orderItem);
        }
        cartService.deleteCartItems(user);
    }

    public List<Order> listOrders(User user) {
        return orderRepository.findAllByUserOrderByCreatedDateDesc(user);
    }
}
