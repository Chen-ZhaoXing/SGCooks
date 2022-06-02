package com.Heap.SGCooks;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path ="api/v1/SGCooks")
public class SGCooksController {
    private final SGCooksService sgCooksService;

    @Autowired
    public SGCooksController(SGCooksService sgCooksService){
        this.sgCooksService = sgCooksService;
    }

    @GetMapping
    public List<User> getUsers(){
        return sgCooksService.getUsers();
    }
}
