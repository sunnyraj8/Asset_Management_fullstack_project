package com.example.asset_management.dashboard.controller;

import com.example.asset_management.dashboard.dto.AssetStatusChartResponse;
import com.example.asset_management.dashboard.dto.DashboardResponse;
import com.example.asset_management.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse dashboard() {
        return dashboardService.getDashboard();
    }

    @GetMapping("/asset-status-chart")
    public List<AssetStatusChartResponse> assetStatusChart() {

        return dashboardService.getAssetStatusChart();
    }
}