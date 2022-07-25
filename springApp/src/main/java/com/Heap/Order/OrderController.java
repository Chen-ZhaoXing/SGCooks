package com.Heap.Order;

import com.Heap.Common.ApiResponse;
import com.Heap.SGCooksUser.User;
import com.Heap.SGCooksUser.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/sgcooks/order")
public class OrderController {

    private final UserService userService;
    private final OrderService orderService;

    @Autowired
    public OrderController(UserService userService, OrderService orderService){
        this.userService =  userService;
        this.orderService = orderService;
    }
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> placeOrder(@RequestParam("email") String email) {

        User user = (User) userService.loadUserByUsername(email);
        orderService.placeOrder(user);
        return new ResponseEntity<>(new ApiResponse(true, "Order has been placed"), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(@RequestParam("email") String email)  {

        User user = (User) userService.loadUserByUsername(email);
        List<Order> orderList = orderService.listOrders(user);

        return new ResponseEntity<>(orderList,HttpStatus.OK);
    }

}
