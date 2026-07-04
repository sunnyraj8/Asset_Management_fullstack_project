package com.example.asset_management.auth.controller;

import com.example.asset_management.auth.dto.LoginRequest;
import com.example.asset_management.auth.dto.LoginResponse;
import com.example.asset_management.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @GetMapping("/me")
    public String me(
            Authentication authentication) {

        return authentication.getName();
    }
}
