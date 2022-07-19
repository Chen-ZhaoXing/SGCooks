package com.Heap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class viewController {
    @GetMapping("/menu")
    public String menu(){
        return "menu";
    }

    @GetMapping("/index")
    public String index(){
        return "index";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/cart")
    public String cart(){
        return "cart";
    }

    @GetMapping("/contact")
    public String contact(){
        return "contact";
    }

    @GetMapping("/page_checkout")
    public String pagecheckout(){
        return "page-checkout";
    }

    @GetMapping("/signup")
    public String signup(){
        return "signup";
    }

    @GetMapping("/thankyou")
    public String thankyou(){
        return "thankyou";
    }

    @GetMapping("/favourites")
    public String favourites(){
        return "favourites";
    }

}
