package com.Heap.SGCooksUser;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Configuration
public class UserConfig {
    //temp encoder to create an encrypted password
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserConfig(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){

        String encodedPassword = bCryptPasswordEncoder.encode("123");
        return args -> {
            User novia = new User(
                    "Novia",
                    "Antony",
                    "novia@gmail.com",
                    encodedPassword,
                    UserRole.USER
            );
            repository.saveAll(
                    List.of(novia)
            );
        };
    }
}
