package com.example.demo.service;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RetailerService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public List<Product> browseProducts() {
        return productRepository.findAll();
    }

    public Order placeOrder(Long productId, int quantity, String email) {

        User retailer = userRepository.findByEmail(email).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        if (product.getStock() < quantity)
            throw new RuntimeException("Not enough stock");

        product.setStock(product.getStock() - quantity);

        Order order = new Order();
        order.setProduct(product);
        order.setRetailer(retailer);
        order.setQuantity(quantity);
        order.setTotalPrice(quantity * product.getPrice());

        return orderRepository.save(order);
    }

    public List<Order> getRetailerOrders(String email) {
        User retailer = userRepository.findByEmail(email).orElseThrow();
        return orderRepository.findByRetailerId(retailer.getId());
    }
}
