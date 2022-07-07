package com.Heap.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional //@Transactional annotation is used when you want the certain method/class(=all methods inside) to be executed in a transaction
public class OrderItemsService {

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    public void addOrderedProducts(OrderItem orderItem){
        orderItemsRepository.save(orderItem);
    }
}
