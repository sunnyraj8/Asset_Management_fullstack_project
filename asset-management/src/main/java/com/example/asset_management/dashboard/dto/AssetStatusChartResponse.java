package com.example.asset_management.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AssetStatusChartResponse {

    private String status;

    private Long count;
}