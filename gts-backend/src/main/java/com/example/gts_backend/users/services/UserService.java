package com.example.gts_backend.users.services;

import com.example.gts_backend.users.entity.*;
import com.example.gts_backend.auth.repository.RoleRepository;
import com.example.gts_backend.auth.repository.UserRepository;
import com.example.gts_backend.users.dtos.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase().trim();

        if (email.isBlank() || request.getPassword() == null || request.getPassword().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email y password son obligatorios");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está registrado");
        }

        RoleEntity userRole = roleRepository.findByName("USER")
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Rol USER no existe"));

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        user.setRoles(Set.of(userRole));

        userRepository.save(user);
    }

    public UserMeResponse me(UserDetails userDetails) {
        String email = userDetails.getUsername().toLowerCase();

        UserEntity user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Set<String> roles = user.getRoles().stream()
            .map(RoleEntity::getName)
            .collect(Collectors.toSet());

        return new UserMeResponse(user.getId(), user.getEmail(), roles);
    }
}
