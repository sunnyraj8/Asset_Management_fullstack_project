package com.example.asset_management.asset.lifecycle;

import com.example.asset_management.asset.entity.Asset;
import com.example.asset_management.asset.entity.AssetStatus;

import java.util.List;

public interface AssetLifecycleService {

    Asset changeStatus(
            Asset asset,
            AssetStatus nextStatus,
            String action,
            String remarks
    );

    List<AssetStatus> getAllowedTransitions(
            AssetStatus currentStatus
    );
}