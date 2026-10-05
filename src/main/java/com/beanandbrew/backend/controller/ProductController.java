package com.beanandbrew.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beanandbrew.backend.model.Product;
import com.beanandbrew.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") 
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;

    @GetMapping 
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @PostMapping("path")
    public Product addProduct(@RequestBody Product product) {
        //TODO: process POST request
        
        return productRepository.save(product);
    }
    



}
