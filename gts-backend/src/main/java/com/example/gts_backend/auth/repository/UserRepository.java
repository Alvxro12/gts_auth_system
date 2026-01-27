package com.example.gts_backend.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gts_backend.users.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);
}
