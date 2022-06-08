package com.Heap.SGCooksUser;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequestMapping(path ="api/v1/sgcooks")
public class SGCooksController {
    private final SGCooksService sgCooksService;

    @Autowired
    public SGCooksController(SGCooksService sgCooksService){
        this.sgCooksService = sgCooksService;
    }

//    @GetMapping
////    public List<User> getUsers(){
////        return sgCooksService.getUsers();
////    }
    @GetMapping
    public String showWelcomePage() {
        return "welcome";
    }
}
