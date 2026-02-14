package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.entity.Product;
import com.example.demo.entity.Order;
import com.example.demo.service.FarmerService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer")
@RequiredArgsConstructor
public class FarmerController {

    private final FarmerService farmerService;
    private final JwtUtil jwtUtil;

    @PostMapping("/product")
    public Product addProduct(
            @RequestBody Product product,
            @RequestHeader("Authorization") String token
    ) {
        String email = jwtUtil.extractEmail(token.substring(7));
        return farmerService.addProduct(product, email);
    }

    @GetMapping("/products")
    public List<Product> getProducts(
            @RequestHeader("Authorization") String token
    ) {
        String email = jwtUtil.extractEmail(token.substring(7));
        return farmerService.getFarmerProducts(email);
    }

    @PutMapping("/product/{id}")
    public Product updateStock(
            @PathVariable Long id,
            @RequestBody Product updatedProduct,
            @RequestHeader("Authorization") String token
    ) {
        String email = jwtUtil.extractEmail(token.substring(7));
        return farmerService.updateStock(id, updatedProduct.getStock(), email);
    }

    @GetMapping("/orders")
    public List<Order> getOrders(
            @RequestHeader("Authorization") String token
    ) {
        String email = jwtUtil.extractEmail(token.substring(7));
        return farmerService.getFarmerOrders(email);
    }
}
