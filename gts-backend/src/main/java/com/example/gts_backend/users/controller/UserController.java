package com.example.gts_backend.users.controller;

import com.example.gts_backend.users.dtos.RegisterRequest;
import com.example.gts_backend.users.dtos.UserMeResponse;
import com.example.gts_backend.users.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest request) {
        userService.register(request);
    }

    @GetMapping("/me")
    public UserMeResponse me(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.me(userDetails);
    }
}
