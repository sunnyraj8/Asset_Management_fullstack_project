package com.example.asset_management.dashboard.service;

import com.example.asset_management.dashboard.dto.AssetStatusChartResponse;
import com.example.asset_management.dashboard.dto.DashboardResponse;

import java.util.List;

public interface DashboardService {

    DashboardResponse getDashboard();

    List<AssetStatusChartResponse> getAssetStatusChart();
}