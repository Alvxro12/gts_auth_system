package com.example.gts_backend.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gts_backend.users.entity.RoleEntity;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    Optional<RoleEntity> findByName(String name);
}
