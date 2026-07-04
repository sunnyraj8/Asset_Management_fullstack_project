package com.example.asset_management.allocation.controller;

import com.example.asset_management.allocation.dto.AllocationResponse;
import com.example.asset_management.allocation.dto.CreateAllocationRequest;
import com.example.asset_management.allocation.service.AllocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@RestController
@RequestMapping("/api/v1/allocations")
@RequiredArgsConstructor
public class AllocationController {

    private final AllocationService allocationService;

    @PostMapping
    public AllocationResponse allocateAsset(
            @Valid @RequestBody CreateAllocationRequest request) {

        return allocationService.allocateAsset(request);
    }

    @PutMapping("/{id}/return")
    public AllocationResponse returnAsset(
            @PathVariable Long id) {

        return allocationService.returnAsset(id);
    }
    @GetMapping
    public Page<AllocationResponse> getAllAllocations(
            Pageable pageable) {

        return allocationService.getAllAllocations(pageable);

    }

    @GetMapping("/{id}")
    public AllocationResponse getAllocationById(
            @PathVariable Long id) {

        return allocationService.getAllocationById(id);

    }

//    @GetMapping("/search")
//    public AllocationResponse searchByAssetCode(
//            @RequestParam String assetCode) {
//
//        return allocationService.getAllocationByAssetCode(assetCode);
//
//    }
    @GetMapping("/active")
    public Page<AllocationResponse> getActiveAllocations(
            Pageable pageable) {

        return allocationService.getActiveAllocations(
                pageable);

    }

    @GetMapping("/search")
    public Page<AllocationResponse> searchAllocations(

            @RequestParam String keyword,

            Pageable pageable) {

        return allocationService.searchAllocations(
                keyword,
                pageable);

    }
}