package com.example.asset_management.allocation.dto;

import com.example.asset_management.allocation.entity.AllocationStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AllocationResponse {

    private Long id;

    private String assetCode;

    private String employeeCode;

    private String employeeName;

    private LocalDate allocatedDate;

    private LocalDate expectedReturnDate;

    private AllocationStatus status;

    private LocalDate returnedDate;

    private Long assetId;
}