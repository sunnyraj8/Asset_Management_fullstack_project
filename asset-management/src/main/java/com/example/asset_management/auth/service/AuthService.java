package com.example.asset_management.auth.service;

import com.example.asset_management.auth.dto.LoginRequest;
import com.example.asset_management.auth.dto.LoginResponse;
import com.example.asset_management.auth.dto.RegisterRequest;

public interface AuthService {

    LoginResponse login(LoginRequest request);
    void register(RegisterRequest request);
}
