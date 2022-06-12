package com.Heap.SGCooks;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
            User novia = new User(
                    "Novia",
                    "novia@gmail.com",
                    "novia@123"
            );
            repository.saveAll(
                    List.of(novia)
            );
        };
    }
}
