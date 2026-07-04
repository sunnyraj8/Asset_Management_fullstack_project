package com.example.asset_management.asset.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateAssetRequest {

    private Integer manufacturerYear;
    @NotBlank(message="Brand is required")
    private String brand;
    @NotBlank(message="Model is required")
    private String model;
    @NotBlank(message="Host Name is required")
    private String hostName;
    @NotBlank(message="Serial Number is required")
    private String serialNumber;

    private String cpu;

    private String ram;

    private String ssd;

    private String operatingSystem;

    private String officeVersion;

    private String powerAdapterSerial;

    private LocalDate warrantyStartDate;

    private LocalDate warrantyEndDate;
    @NotNull(message="Department is required")
    private Long departmentId;
    @NotNull(message="Engineer is required")
    private Long engineerId;
}