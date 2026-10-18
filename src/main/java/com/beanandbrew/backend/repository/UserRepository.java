package com.beanandbrew.backend.repository;

import java.util.Optional;

import com.beanandbrew.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);
}
