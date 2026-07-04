package com.example.asset_management.asset.dto;

import com.example.asset_management.asset.entity.AssetStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AssetResponse {

    private Long id;

    private String assetCode;

    private Integer manufacturerYear;

    private String brand;

    private String model;

    private String hostName;

    private String serialNumber;

    private String cpu;

    private String ram;

    private String ssd;

    private String operatingSystem;

    private String officeVersion;

    private String powerAdapterSerial;

    private LocalDate warrantyStartDate;

    private LocalDate warrantyEndDate;

    private String department;

    private String engineer;

    private AssetStatus status;

    private Long departmentId;

    private Long engineerId;


}