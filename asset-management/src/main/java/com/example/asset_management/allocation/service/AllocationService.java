package com.example.asset_management.allocation.service;

import com.example.asset_management.allocation.dto.AllocationResponse;
import com.example.asset_management.allocation.dto.CreateAllocationRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AllocationService {

    AllocationResponse allocateAsset(
            CreateAllocationRequest request);

    AllocationResponse returnAsset(
            Long allocationId);

    Page<AllocationResponse> getAllAllocations(
            Pageable pageable);

    AllocationResponse getAllocationById(
            Long id);

//    AllocationResponse getAllocationByAssetCode(
//            String assetCode);

    Page<AllocationResponse> getActiveAllocations(
            Pageable pageable);

    Page<AllocationResponse> searchAllocations(
            String keyword,
            Pageable pageable);
}