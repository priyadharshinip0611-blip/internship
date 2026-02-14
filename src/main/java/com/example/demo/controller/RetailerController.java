package com.example.demo.controller;


import com.example.demo.config.JwtUtil;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.RetailerService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/retailer")
@RequiredArgsConstructor
public class RetailerController {

    private final RetailerService retailerService;
    private final JwtUtil jwtUtil;

    @GetMapping("/products")
    public List<Product> browseProducts() {
        return retailerService.browseProducts();
    }

    @PostMapping("/order/{productId}")
    public Order placeOrder(
            @PathVariable Long productId,
            @RequestParam int quantity,
            @RequestHeader("Authorization") String token
    ) {
        String email = jwtUtil.extractEmail(token.substring(7));
        return retailerService.placeOrder(productId, quantity, email);
    }

    @GetMapping("/orders")
    public List<Order> getOrders(
            @RequestHeader("Authorization") String token
    ) {
        String email = jwtUtil.extractEmail(token.substring(7));
        return retailerService.getRetailerOrders(email);
    }
}
