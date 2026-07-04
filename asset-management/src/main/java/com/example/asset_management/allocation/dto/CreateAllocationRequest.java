package com.example.asset_management.allocation.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateAllocationRequest {

    @NotNull(message = "Asset is required")
    private Long assetId;

    @NotNull(message = "Employee is required")
    private Long employeeId;

    @NotNull(message = "Expected Return Date is required")
    private LocalDate expectedReturnDate;

    private String remarks;
}