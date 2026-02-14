package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;
    private String status = "PENDING";
    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "retailer_id")
    private User retailer;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
