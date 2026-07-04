package com.example.asset_management.asset.history.entity;

import com.example.asset_management.asset.entity.Asset;
import com.example.asset_management.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "asset_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;

    private String remarks;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset;
}