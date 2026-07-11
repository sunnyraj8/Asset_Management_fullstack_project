package com.example.asset_management.asset.history.controller;


import com.example.asset_management.asset.history.dto.AssetHistoryResponse;
import com.example.asset_management.asset.history.service.AssetHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/history")
@RequiredArgsConstructor
public class AssetHistoryController {

    private final AssetHistoryService assetHistoryService;

    @GetMapping
    public Page<AssetHistoryResponse> getHistory(
            Pageable pageable) {

        return assetHistoryService.getHistory(pageable);

    }

    @GetMapping("/asset/{assetId}")
    public Page<AssetHistoryResponse> getHistoryByAsset(
            @PathVariable Long assetId,
            Pageable pageable) {

        return assetHistoryService.getHistoryByAsset(
                assetId,
                pageable);

    }

    @GetMapping("/search")
    public Page<AssetHistoryResponse> searchHistory(
            @RequestParam String keyword,
            Pageable pageable) {

        return assetHistoryService.searchHistory(
                keyword,
                pageable);

    }

    @GetMapping("/action")
    public Page<AssetHistoryResponse> getHistoryByAction(
            @RequestParam String action,
            Pageable pageable) {

        return assetHistoryService.getHistoryByAction(
                action,
                pageable);

    }

}
