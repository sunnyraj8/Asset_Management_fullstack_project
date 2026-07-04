package com.example.asset_management.employee.entity;

import com.example.asset_management.common.entity.BaseEntity;
import com.example.asset_management.department.entity.Department;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String employeeCode;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    private String designation;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private Boolean active = true;
}