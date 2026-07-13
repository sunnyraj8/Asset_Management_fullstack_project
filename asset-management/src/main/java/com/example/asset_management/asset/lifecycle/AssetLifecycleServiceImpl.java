package com.example.asset_management.asset.lifecycle;

import com.example.asset_management.asset.entity.Asset;
import com.example.asset_management.asset.history.entity.AssetHistory;
import com.example.asset_management.asset.entity.AssetStatus;
import com.example.asset_management.asset.history.repository.AssetHistoryRepository;
import com.example.asset_management.asset.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetLifecycleServiceImpl
        implements AssetLifecycleService {

    private final AssetRepository assetRepository;

    private final AssetHistoryRepository assetHistoryRepository;

    @Override
    @Transactional
    public Asset changeStatus(
            Asset asset,
            AssetStatus nextStatus,
            String action,
            String remarks
    ) {

        AssetStateMachine.validateTransition(
                asset.getStatus(),
                nextStatus
        );

        asset.setStatus(nextStatus);

        asset = assetRepository.save(asset);

        AssetHistory history =
                AssetHistory.builder()
                        .asset(asset)
                        .action(action)
                        .remarks(remarks)
                        .build();

        assetHistoryRepository.save(history);

        return asset;

    }

    @Override
    public List<AssetStatus> getAllowedTransitions(
            AssetStatus currentStatus) {

        return AssetStateMachine.getAllowedTransitions(currentStatus);

    }

}