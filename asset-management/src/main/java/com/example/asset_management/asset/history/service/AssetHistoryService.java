package com.example.asset_management.asset.history.service;

import com.example.asset_management.asset.history.dto.AssetHistoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AssetHistoryService {

    Page<AssetHistoryResponse> getHistory(
            Pageable pageable);

    Page<AssetHistoryResponse> getHistoryByAsset(
            Long assetId,
            Pageable pageable);

    Page<AssetHistoryResponse> searchHistory(
            String keyword,
            Pageable pageable);

    Page<AssetHistoryResponse> getHistoryByAction(
            String action,
            Pageable pageable);

}
