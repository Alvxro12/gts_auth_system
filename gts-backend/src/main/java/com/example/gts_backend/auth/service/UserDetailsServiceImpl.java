package com.example.gts_backend.auth.service;

import com.example.gts_backend.auth.repository.UserRepository;
import com.example.gts_backend.users.entity.UserEntity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email.toLowerCase())
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!user.isActive()) {
            throw new UsernameNotFoundException("Usuario inactivo");
        }

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPasswordHash(),
            user.getRoles().stream()
                .map(r -> new SimpleGrantedAuthority("ROLE_" + r.getName()))
                .collect(Collectors.toSet())
        );
    }
}
