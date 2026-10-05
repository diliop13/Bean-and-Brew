package com.beanandbrew.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    private double price;

    // Ένας κενός κατασκευαστής (Constructor) είναι απολύτως υποχρεωτικός για να λειτουργήσει το Spring Boot/JPA
    public Product() {
    }

    // Κατασκευαστής με παραμέτρους (βοηθάει εμάς όταν γράφουμε κώδικα)
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Getters και Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}