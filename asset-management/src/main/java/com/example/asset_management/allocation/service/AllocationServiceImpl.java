package com.example.asset_management.allocation.service;

import com.example.asset_management.allocation.dto.AllocationResponse;
import com.example.asset_management.allocation.dto.CreateAllocationRequest;
import com.example.asset_management.allocation.entity.Allocation;
import com.example.asset_management.allocation.entity.AllocationStatus;
import com.example.asset_management.allocation.repository.AllocationRepository;
import com.example.asset_management.asset.entity.Asset;
import com.example.asset_management.asset.entity.AssetStatus;
import com.example.asset_management.asset.history.entity.AssetHistory;
import com.example.asset_management.asset.history.repository.AssetHistoryRepository;
import com.example.asset_management.asset.repository.AssetRepository;
import com.example.asset_management.employee.entity.Employee;
import com.example.asset_management.employee.repository.EmployeeRepository;
import com.example.asset_management.exception.DuplicateResourceException;
import com.example.asset_management.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AllocationServiceImpl implements AllocationService {

    private final AllocationRepository allocationRepository;

    private final AssetRepository assetRepository;

    private final EmployeeRepository employeeRepository;

    private final AssetHistoryRepository assetHistoryRepository;

    @Override
    @Transactional
    public AllocationResponse allocateAsset(CreateAllocationRequest request) {

        Asset asset = assetRepository.findById(request.getAssetId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Asset not found"));

        if (asset.getStatus() != AssetStatus.NEW &&
                asset.getStatus() != AssetStatus.RETURNED) {

            throw new DuplicateResourceException(
                    "Only NEW or RETURNED assets can be allocated");
        }

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        allocationRepository
                .findByAssetIdAndStatus(
                        asset.getId(),
                        AllocationStatus.ACTIVE)
                .ifPresent(allocation -> {
                    throw new DuplicateResourceException(
                            "Asset is already allocated");
                });

        Allocation allocation = Allocation.builder()
                .asset(asset)
                .employee(employee)
                .allocatedDate(LocalDate.now())
                .expectedReturnDate(request.getExpectedReturnDate())
                .remarks(request.getRemarks())
                .status(AllocationStatus.ACTIVE)
                .build();

        allocation = allocationRepository.save(allocation);

        AssetHistory history = AssetHistory.builder()
                .asset(asset)
                .action("ALLOCATED")
                .remarks("Allocated to " +
                        employee.getFirstName() + " " +
                        employee.getLastName())
                .build();

        assetHistoryRepository.save(history);

        asset.setStatus(AssetStatus.ALLOCATED);

        assetRepository.save(asset);

        return mapToResponse(allocation);
    }

    @Override
    @Transactional
    public AllocationResponse returnAsset(Long allocationId) {

        Allocation allocation =
                allocationRepository
                        .findByIdAndStatus(
                                allocationId,
                                AllocationStatus.ACTIVE)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Active allocation not found"));

        allocation.setReturnedDate(LocalDate.now());

        allocation.setStatus(
                AllocationStatus.RETURNED);

        Asset asset = allocation.getAsset();

        asset.setStatus(
                AssetStatus.RETURNED);

        allocationRepository.save(allocation);

        assetRepository.save(asset);

        AssetHistory history = AssetHistory.builder()
                .asset(asset)
                .action("RETURNED")
                .remarks("Returned by " +
                        allocation.getEmployee().getFirstName()
                        + " "
                        + allocation.getEmployee().getLastName())
                .build();

        assetHistoryRepository.save(history);

        return mapToResponse(allocation);
    }

    @Override
    public Page<AllocationResponse> getAllAllocations(Pageable pageable) {

        return allocationRepository
                .findAll(pageable)
                .map(this::mapToResponse);
    }

    @Override
    public AllocationResponse getAllocationById(Long id) {

        Allocation allocation =
                allocationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Allocation not found"));

        return mapToResponse(allocation);
    }

//    @Override
//    public AllocationResponse getAllocationByAssetCode(String assetCode) {
//
//        Allocation allocation =
//                allocationRepository
//                        .findByAssetAssetCode(assetCode)
//                        .orElseThrow(() ->
//                                new ResourceNotFoundException(
//                                        "Allocation not found"));
//
//        return mapToResponse(allocation);
//    }

    @Override
    public Page<AllocationResponse> getActiveAllocations(
            Pageable pageable) {

        return allocationRepository
                .findByStatus(
                        AllocationStatus.ACTIVE,
                        pageable)
                .map(this::mapToResponse);

    }

    @Override
    public Page<AllocationResponse> searchAllocations(
            String keyword,
            Pageable pageable) {

        return allocationRepository
                .search(keyword, pageable)
                .map(this::mapToResponse);
    }
    private AllocationResponse mapToResponse(
            Allocation allocation) {

        return AllocationResponse.builder()
                .id(allocation.getId())
                .assetId(allocation.getAsset().getId())
                .assetCode(
                        allocation.getAsset().getAssetCode())
                .employeeCode(
                        allocation.getEmployee().getEmployeeCode())
                .employeeName(
                        allocation.getEmployee().getFirstName()
                                + " "
                                + allocation.getEmployee().getLastName())
                .allocatedDate(
                        allocation.getAllocatedDate())
                .expectedReturnDate(
                        allocation.getExpectedReturnDate())
                .returnedDate(
                        allocation.getReturnedDate())
                .status(
                        allocation.getStatus())
                .build();
    }

}