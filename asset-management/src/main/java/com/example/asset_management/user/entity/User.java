package com.example.asset_management.user.entity;

import com.example.asset_management.common.entity.BaseEntity;
import com.example.asset_management.role.entity.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private Boolean active = true;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
