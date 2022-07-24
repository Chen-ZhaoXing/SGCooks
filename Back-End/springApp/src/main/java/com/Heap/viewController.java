package com.Heap;

import com.Heap.SGCooksUser.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public String login(Model model){
        model.addAttribute("user", new User());
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

    @GetMapping("/page-checkout")
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

    @GetMapping("/orders")
    public String orders(){
        return "orders";
    }

}
