package com.example.asset_management.asset.history.service;

import com.example.asset_management.asset.history.dto.AssetHistoryResponse;
import com.example.asset_management.asset.history.entity.AssetHistory;
import com.example.asset_management.asset.history.repository.AssetHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetHistoryServiceImpl implements AssetHistoryService {

    private final AssetHistoryRepository assetHistoryRepository;

    @Override
    public Page<AssetHistoryResponse> getHistory(Pageable pageable) {

        return assetHistoryRepository
                .findAllByOrderByCreatedAtDesc(pageable)
                .map(this::mapToResponse);

    }

    @Override
    public Page<AssetHistoryResponse> getHistoryByAsset(
            Long assetId,
            Pageable pageable) {

        return assetHistoryRepository
                .findByAssetIdOrderByCreatedAtDesc(
                        assetId,
                        pageable)
                .map(this::mapToResponse);

    }

    @Override
    public Page<AssetHistoryResponse> searchHistory(
            String keyword,
            Pageable pageable) {

        return assetHistoryRepository
                .findByAssetAssetCodeContainingIgnoreCaseOrderByCreatedAtDesc(
                        keyword,
                        pageable)
                .map(this::mapToResponse);

    }

    @Override
    public Page<AssetHistoryResponse> getHistoryByAction(
            String action,
            Pageable pageable) {

        return assetHistoryRepository
                .findByActionOrderByCreatedAtDesc(
                        action,
                        pageable)
                .map(this::mapToResponse);

    }

    private AssetHistoryResponse mapToResponse(
            AssetHistory history) {

        return AssetHistoryResponse
                .builder()
                .id(history.getId())
                .assetCode(history.getAsset().getAssetCode())
                .action(history.getAction())
                .remarks(history.getRemarks())
                .createdAt(history.getCreatedAt())
                .build();

    }

}
