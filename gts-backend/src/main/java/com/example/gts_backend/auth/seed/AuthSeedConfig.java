package com.example.gts_backend.auth.seed;

import com.example.gts_backend.users.entity.*;
import com.example.gts_backend.auth.repository.RoleRepository;
import com.example.gts_backend.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class AuthSeedConfig {

    @Bean
    public CommandLineRunner seedAuthData(
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            RoleEntity adminRole = roleRepository.findByName("ADMIN").orElseGet(() -> {
                RoleEntity r = new RoleEntity();
                r.setName("ADMIN");
                return roleRepository.save(r);
            });

            RoleEntity userRole = roleRepository.findByName("USER").orElseGet(() -> {
                RoleEntity r = new RoleEntity();
                r.setName("USER");
                return roleRepository.save(r);
            });

            userRepository.findByEmail("admin@gts.com").orElseGet(() -> {
                UserEntity u = new UserEntity();
                u.setEmail("admin@gts.com");
                u.setPasswordHash(passwordEncoder.encode("admin123"));
                u.setActive(true);
                u.setRoles(Set.of(adminRole));
                return userRepository.save(u);
            });

            userRepository.findByEmail("user@gts.com").orElseGet(() -> {
                UserEntity u = new UserEntity();
                u.setEmail("user@gts.com");
                u.setPasswordHash(passwordEncoder.encode("user123"));
                u.setActive(true);
                u.setRoles(Set.of(userRole));
                return userRepository.save(u);
            });
        };
    }
}
