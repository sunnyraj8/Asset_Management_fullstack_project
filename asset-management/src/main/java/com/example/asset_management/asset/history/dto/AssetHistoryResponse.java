package com.example.asset_management.asset.history.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AssetHistoryResponse {

    private Long id;

    private String assetCode;

    private String action;

    private String remarks;

    private LocalDateTime createdAt;

}
