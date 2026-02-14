package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.entity.Order;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmerService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    /* ================= ADD PRODUCT ================= */

    public Product addProduct(Product product, String email) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        product.setFarmer(farmer);
        return productRepository.save(product);
    }

    /* ================= GET FARMER PRODUCTS ================= */

    public List<Product> getFarmerProducts(String email) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return productRepository.findByFarmerId(farmer.getId());
    }

    /* ================= UPDATE STOCK ================= */

    public Product updateStock(Long productId, int newStock, String email) {

        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Make sure farmer owns product
        if (!product.getFarmer().getId().equals(farmer.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        product.setStock(newStock);
        return productRepository.save(product);
    }

    /* ================= GET ORDERS RECEIVED ================= */

    public List<Order> getFarmerOrders(String email) {

        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return orderRepository.findByProductFarmerId(farmer.getId());
    }
}
