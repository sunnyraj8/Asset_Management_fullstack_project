package com.example.asset_management.asset.controller;

import com.example.asset_management.asset.dto.*;
import com.example.asset_management.asset.entity.AssetStatus;
import com.example.asset_management.asset.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @PostMapping
    public AssetResponse createAsset(
            @Valid
            @RequestBody CreateAssetRequest request) {

        return assetService.createAsset(request);
    }

    @GetMapping("/{id}")
    public AssetResponse getAssetById(@PathVariable Long id) {

        return assetService.getAssetById(id);
    }

    @GetMapping
    public Page<AssetResponse> getAllAssets(Pageable pageable) {

        return assetService.getAllAssets(pageable);
    }

    @PutMapping("/{id}")
    public AssetResponse updateAsset(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAssetRequest request) {

        return assetService.updateAsset(id, request);
    }
    @GetMapping("/search")
    public AssetResponse getAssetByCode(
            @RequestParam String assetCode) {

        return assetService.getAssetByCode(assetCode);
    }

    //instead of deleting assets , we will chnage status to scrapped so that it will be avaialble in logs.
    @PutMapping("/{id}/status")
    public AssetResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAssetStatusRequest request) {

        return assetService.updateAssetStatus(id, request);
    }

    @GetMapping("/available")
    public List<AvailableAssetResponse> getAvailableAssets() {

        return assetService.getAvailableAssets();

    }

    @GetMapping("/{id}/next-statuses")
    public List<AssetStatus> getNextStatuses(
            @PathVariable Long id) {

        return assetService.getNextStatuses(id);

    }
}