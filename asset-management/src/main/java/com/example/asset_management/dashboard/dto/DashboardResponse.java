package com.example.asset_management.dashboard.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {

    private long totalAssets;

    private long newAssets;

    private long allocatedAssets;

    private long returnedAssets;

    private long scrappedAssets;

    private long totalEmployees;

    private long totalDepartments;

    private long activeAllocations;
}