package com.beanandbrew.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beanandbrew.backend.model.Order;
import com.beanandbrew.backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.GetMapping;

@RestController 
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") 
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @GetMapping 
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }
    

    @PostMapping 
    public Order createOrder(@RequestBody Order order ){
        return orderRepository.save(order);
    }
}
