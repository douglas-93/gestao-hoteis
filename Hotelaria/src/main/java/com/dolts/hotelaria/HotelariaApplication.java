package com.dolts.hotelaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.dolts.hotelaria.repositories")
@SpringBootApplication
public class HotelariaApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelariaApplication.class, args);
    }

}
