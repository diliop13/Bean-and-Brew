package com.beanandbrew.backend.controller;

import com.beanandbrew.backend.repository.UserRepository;

import com.beanandbrew.backend.model.User;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/api")
@CrossOrigin(origins ="*")


public class AuthController {

    @Autowired 
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User newUser){

        //ELEGXEI AN YPARXEI HDH TO USENAME KAI EPISTREFEI ENA MYNHMA
        if(userRepository.findByUsername(newUser.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body("Username is already taken!");
        }
        
        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully!");
    
    } 

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest){
        
        var userOptional= userRepository.findByUsername(loginRequest.getUsername());

        //PSAXNOYME AN VRETHIKE O XRHSTHS
        if(userOptional.isPresent()){
            User existingUser = userOptional.get();

                if(existingUser.getPassword().equals(loginRequest.getPassword())){
                    return ResponseEntity.ok("Login Successfull!");
                }
                else {
                    return ResponseEntity.badRequest().body("Invalid password!");
                }
        }
     return ResponseEntity.badRequest().body("User not found!");
    }
}
