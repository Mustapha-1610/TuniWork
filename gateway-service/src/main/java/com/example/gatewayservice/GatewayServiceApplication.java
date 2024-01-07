package com.example.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path("/node/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("http://localhost:5000"))

                .route(r -> r.path("/users/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://USER-SERVICE"))
                .route(r -> r.path("/users/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://Freelancer-Email-SERVICE"))
                .build();
    }
}
