package com.example.asset_management.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DepartmentAssetChartResponse {

    private String department;

    private Long count;

}