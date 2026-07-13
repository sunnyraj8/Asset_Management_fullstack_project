package com.example.asset_management.asset.service;

import com.example.asset_management.asset.dto.*;
import com.example.asset_management.asset.entity.AssetStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface AssetService {

    AssetResponse createAsset(CreateAssetRequest request);
    AssetResponse getAssetById(Long id);
    Page<AssetResponse> getAllAssets(Pageable pageable);
    AssetResponse updateAsset(Long id, UpdateAssetRequest request);
    AssetResponse getAssetByCode(String assetCode);
    AssetResponse updateAssetStatus(
            Long id,
            UpdateAssetStatusRequest request);

    List<AvailableAssetResponse> getAvailableAssets();

    List<AssetStatus> getNextStatuses(Long assetId);
}