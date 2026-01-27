package com.example.gts_backend.auth.controller;

import com.example.gts_backend.auth.dto.*;
import com.example.gts_backend.auth.service.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        String email = request.getEmail().toLowerCase();

        try{
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        return new LoginResponse(token);
        }
        catch (AuthenticationException ex) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
    }
    }
}
