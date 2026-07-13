package com.example.asset_management.asset.service;

import com.example.asset_management.asset.dto.*;
import com.example.asset_management.asset.entity.Asset;
import com.example.asset_management.asset.entity.AssetStatus;
import com.example.asset_management.asset.lifecycle.AssetLifecycleService;
import com.example.asset_management.asset.repository.AssetRepository;
import com.example.asset_management.department.entity.Department;
import com.example.asset_management.department.repository.DepartmentRepository;
import com.example.asset_management.employee.repository.EmployeeRepository;
import com.example.asset_management.exception.DuplicateResourceException;
import com.example.asset_management.exception.ResourceNotFoundException;
import com.example.asset_management.user.entity.User;
import com.example.asset_management.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

import com.example.asset_management.asset.history.entity.AssetHistory;
import com.example.asset_management.asset.history.repository.AssetHistoryRepository;
import com.example.asset_management.employee.entity.Employee;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;

    private final DepartmentRepository departmentRepository;

    private final EmployeeRepository employeeRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final AssetLifecycleService assetLifecycleService;

    @Override
    public AssetResponse createAsset(CreateAssetRequest request) {
        if (assetRepository.existsBySerialNumber(request.getSerialNumber())) {
            throw new DuplicateResourceException("Serial Number already exists");
        }

        if (assetRepository.existsByHostName(request.getHostName())) {
            throw new DuplicateResourceException("Host Name already exists");
        }
        Department department =
                departmentRepository.findById(
                                request.getDepartmentId())
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Department not found"));

        Employee engineer =
                employeeRepository.findById(request.getEngineerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Engineer not found"));

        String assetCode = generateAssetCode();

        Asset asset =
                Asset.builder()
                        .assetCode(assetCode)
                        .manufacturerYear(request.getManufacturerYear())
                        .brand(request.getBrand())
                        .model(request.getModel())
                        .hostName(request.getHostName())
                        .serialNumber(request.getSerialNumber())
                        .cpu(request.getCpu())
                        .ram(request.getRam())
                        .ssd(request.getSsd())
                        .operatingSystem(request.getOperatingSystem())
                        .officeVersion(request.getOfficeVersion())
                        .powerAdapterSerial(request.getPowerAdapterSerial())
                        .warrantyStartDate(request.getWarrantyStartDate())
                        .warrantyEndDate(request.getWarrantyEndDate())
                        .department(department)
                        .engineer(engineer)
                        .status(AssetStatus.NEW)
                        .build();

        asset = assetRepository.save(asset);

        AssetHistory history = AssetHistory.builder()
                .asset(asset)
                .action("CREATED")
                .remarks("Asset created")
                .build();

        assetHistoryRepository.save(history);

        return mapToResponse(asset);
    }
    @Override
    public AssetResponse getAssetById(Long id) {

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found"));

        return mapToResponse(asset);
    }

    @Override
    public Page<AssetResponse> getAllAssets(Pageable pageable) {

        return assetRepository.findAll(pageable)
                .map(asset -> AssetResponse.builder()
                        .id(asset.getId())
                        .assetCode(asset.getAssetCode())
                        .brand(asset.getBrand())
                        .model(asset.getModel())
                        .status(asset.getStatus())
                        .build());
    }
    @Override
    public AssetResponse updateAsset(Long id, UpdateAssetRequest request) {

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found"));
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));

        Employee engineer =
                employeeRepository.findById(request.getEngineerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Engineer not found"));
        asset.setManufacturerYear(request.getManufacturerYear());

        asset.setBrand(request.getBrand());

        asset.setModel(request.getModel());

        asset.setHostName(request.getHostName());

        asset.setSerialNumber(request.getSerialNumber());

        asset.setCpu(request.getCpu());

        asset.setRam(request.getRam());

        asset.setSsd(request.getSsd());

        asset.setOperatingSystem(request.getOperatingSystem());

        asset.setOfficeVersion(request.getOfficeVersion());

        asset.setPowerAdapterSerial(request.getPowerAdapterSerial());

        asset.setWarrantyStartDate(request.getWarrantyStartDate());

        asset.setWarrantyEndDate(request.getWarrantyEndDate());

        asset.setDepartment(department);

        asset.setEngineer(engineer);
        if (assetRepository.existsByHostNameAndIdNot(request.getHostName(), id)) {
            throw new DuplicateResourceException("Host Name already exists");
        }

        if (assetRepository.existsBySerialNumberAndIdNot(request.getSerialNumber(), id)) {
            throw new DuplicateResourceException("Serial Number already exists");
        }
        asset = assetRepository.save(asset);

        AssetHistory history = AssetHistory.builder()
                .asset(asset)
                .action("UPDATED")
                .remarks("Asset information updated")
                .build();

        assetHistoryRepository.save(history);
        return mapToResponse(asset);
    }

    @Override
    public AssetResponse getAssetByCode(String assetCode) {

        Asset asset = assetRepository.findByAssetCode(assetCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found"));

        return mapToResponse(asset);
    }

    @Override
    public AssetResponse updateAssetStatus(
            Long id,
            UpdateAssetStatusRequest request) {

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found"));

        asset = assetLifecycleService.changeStatus(

                asset,

                request.getStatus(),

                "STATUS_CHANGED",

                "Status changed from "
                        + asset.getStatus()
                        + " to "
                        + request.getStatus()

        );

        return mapToResponse(asset);

    }
    private String generateAssetCode() {

        long nextNumber =
                assetRepository
                        .findTopByOrderByIdDesc()
                        .map(asset -> asset.getId() + 1)
                        .orElse(1L);

        return String.format(
                "AST-%06d",
                nextNumber);
    }
    @Override
    public List<AvailableAssetResponse> getAvailableAssets() {

        List<AssetStatus> statuses = List.of(

                AssetStatus.NEW,

                AssetStatus.RETURNED

        );

        return assetRepository
                .findByStatusIn(statuses)
                .stream()
                .map(asset -> AvailableAssetResponse.builder()
                        .id(asset.getId())
                        .assetCode(asset.getAssetCode())
                        .brand(asset.getBrand())
                        .model(asset.getModel())
                        .status(asset.getStatus())
                        .build())
                .toList();

    }

    @Override
    public List<AssetStatus> getNextStatuses(Long assetId) {

        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found"));

        return assetLifecycleService.getAllowedTransitions(
                asset.getStatus());

    }
    private AssetResponse mapToResponse(Asset asset) {

        return AssetResponse.builder()
                .id(asset.getId())
                .assetCode(asset.getAssetCode())
                .manufacturerYear(asset.getManufacturerYear())
                .brand(asset.getBrand())
                .model(asset.getModel())
                .hostName(asset.getHostName())
                .serialNumber(asset.getSerialNumber())
                .cpu(asset.getCpu())
                .ram(asset.getRam())
                .ssd(asset.getSsd())
                .operatingSystem(asset.getOperatingSystem())
                .officeVersion(asset.getOfficeVersion())
                .powerAdapterSerial(asset.getPowerAdapterSerial())
                .warrantyStartDate(asset.getWarrantyStartDate())
                .warrantyEndDate(asset.getWarrantyEndDate())
                .department(asset.getDepartment().getDepartmentName())
                .engineer(
                        asset.getEngineer().getFirstName()
                                + " "
                                + asset.getEngineer().getLastName())
                .status(asset.getStatus())
                .departmentId(asset.getDepartment().getId())

                .engineerId(asset.getEngineer().getId())
                .build();
    }
}