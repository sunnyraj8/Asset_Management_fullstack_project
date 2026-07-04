package com.example.asset_management.asset.history.repository;

import com.example.asset_management.asset.history.entity.AssetHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetHistoryRepository extends JpaRepository<AssetHistory, Long> {

}