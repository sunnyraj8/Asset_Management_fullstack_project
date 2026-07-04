package com.example.asset_management.auth.service;

import com.example.asset_management.auth.dto.LoginRequest;
import com.example.asset_management.auth.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
}
