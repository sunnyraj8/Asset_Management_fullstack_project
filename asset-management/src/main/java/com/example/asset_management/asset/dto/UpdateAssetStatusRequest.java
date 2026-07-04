package com.example.asset_management.asset.dto;

import com.example.asset_management.asset.entity.AssetStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateAssetStatusRequest {

    @NotNull(message = "Status is required")
    private AssetStatus status;

}