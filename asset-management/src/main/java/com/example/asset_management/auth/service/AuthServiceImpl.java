package com.example.asset_management.auth.service;

import com.example.asset_management.auth.dto.LoginRequest;
import com.example.asset_management.auth.dto.LoginResponse;
import com.example.asset_management.auth.dto.RegisterRequest;
import com.example.asset_management.role.entity.Role;
import com.example.asset_management.role.repository.RoleRepository;
import com.example.asset_management.security.JwtService;
import com.example.asset_management.user.entity.User;
import com.example.asset_management.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final RoleRepository roleRepository;

    @Override
    public LoginResponse login(LoginRequest request) {

        User user =
                userRepository
                        .findByUsername(
                                request.getUsername())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Invalid Username"));

        boolean matched =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPasswordHash());

        if (!matched) {
            throw new RuntimeException(
                    "Invalid Password");
        }

        String token =
                jwtService.generateToken(
                        user.getUsername());

        return LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().getRoleName())
                .build();
    }

    @Override
    public void register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = User.builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .active(true)
                .build();

        userRepository.save(user);
    }


}
