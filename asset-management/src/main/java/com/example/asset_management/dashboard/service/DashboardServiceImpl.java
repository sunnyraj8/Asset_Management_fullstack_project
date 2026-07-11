package com.example.asset_management.dashboard.service;

import com.example.asset_management.allocation.entity.AllocationStatus;
import com.example.asset_management.allocation.repository.AllocationRepository;
import com.example.asset_management.asset.entity.AssetStatus;
import com.example.asset_management.asset.repository.AssetRepository;
import com.example.asset_management.dashboard.dto.AssetStatusChartResponse;
import com.example.asset_management.dashboard.dto.DashboardResponse;
import com.example.asset_management.dashboard.dto.DepartmentAssetChartResponse;
import com.example.asset_management.department.repository.DepartmentRepository;
import com.example.asset_management.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final AssetRepository assetRepository;

    private final EmployeeRepository employeeRepository;

    private final DepartmentRepository departmentRepository;

    private final AllocationRepository allocationRepository;

    @Override
    public DashboardResponse getDashboard() {

        return DashboardResponse.builder()
                .totalAssets(assetRepository.count())

                .newAssets(assetRepository.countByStatus(AssetStatus.NEW))

                .allocatedAssets(assetRepository.countByStatus(AssetStatus.ALLOCATED))

                .returnedAssets(assetRepository.countByStatus(AssetStatus.RETURNED))

                .scrappedAssets(assetRepository.countByStatus(AssetStatus.SCRAPPED))

                .totalEmployees(employeeRepository.count())

                .totalDepartments(departmentRepository.count())

                .activeAllocations(allocationRepository.countByStatus(AllocationStatus.ACTIVE))

                .build();
    }
    @Override
    public List<AssetStatusChartResponse> getAssetStatusChart() {

        return assetRepository.getAssetStatusChart();
    }

    @Override
    public List<DepartmentAssetChartResponse> getDepartmentAssetChart() {

        return assetRepository.getDepartmentAssetChart();

    }
}