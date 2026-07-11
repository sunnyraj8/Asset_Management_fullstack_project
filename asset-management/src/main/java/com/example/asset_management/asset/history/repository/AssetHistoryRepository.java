package com.example.asset_management.asset.history.repository;

import com.example.asset_management.asset.history.entity.AssetHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetHistoryRepository
        extends JpaRepository<AssetHistory, Long> {

    Page<AssetHistory> findAllByOrderByCreatedAtDesc(
            Pageable pageable);

    Page<AssetHistory> findByAssetIdOrderByCreatedAtDesc(
            Long assetId,
            Pageable pageable);

    Page<AssetHistory>
    findByAssetAssetCodeContainingIgnoreCaseOrderByCreatedAtDesc(
            String assetCode,
            Pageable pageable);

    Page<AssetHistory>
    findByActionOrderByCreatedAtDesc(
            String action,
            Pageable pageable);

}