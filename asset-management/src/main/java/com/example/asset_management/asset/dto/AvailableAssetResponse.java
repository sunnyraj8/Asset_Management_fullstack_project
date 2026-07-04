package com.example.asset_management.asset.dto;

import com.example.asset_management.asset.entity.AssetStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AvailableAssetResponse {

    private Long id;

    private String assetCode;

    private String brand;

    private String model;

    private AssetStatus status;

}