package com.Heap.SGCooksUser;

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
                    "Antony",
                    "novia@gmail.com",
                    "novia@123",
                    UserRole.USER
            );
            repository.saveAll(
                    List.of(novia)
            );
        };
    }
}
