package com.example.asset_management.asset.entity;

import com.example.asset_management.common.entity.BaseEntity;
import com.example.asset_management.department.entity.Department;
import com.example.asset_management.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import com.example.asset_management.employee.entity.Employee;

@Entity
@Table(name = "assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String assetCode;

    private Integer manufacturerYear;

    private String brand;

    private String model;

    @Column(unique = true)
    private String hostName;

    @Column(unique = true)
    private String serialNumber;

    private String cpu;

    private String ram;

    private String ssd;

    private String operatingSystem;

    private String officeVersion;

    private String powerAdapterSerial;

    private LocalDate warrantyStartDate;

    private LocalDate warrantyEndDate;

    private LocalDate receivedDate;

    private String assetType;

    private String poNumber;

    private LocalDate poDate;

    private String invoiceNumber;

    private LocalDate invoiceDate;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "engineer_id")
    private Employee engineer;
}