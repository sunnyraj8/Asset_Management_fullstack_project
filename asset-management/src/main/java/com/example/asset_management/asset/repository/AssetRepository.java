package com.example.asset_management.asset.repository;

import com.example.asset_management.asset.entity.Asset;
import com.example.asset_management.dashboard.dto.DepartmentAssetChartResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.asset_management.asset.entity.AssetStatus;

import java.util.List;
import java.util.Optional;
import com.example.asset_management.dashboard.dto.AssetStatusChartResponse;
import org.springframework.data.jpa.repository.Query;

public interface AssetRepository
        extends JpaRepository<Asset, Long> {

    Optional<Asset> findByAssetCode(String assetCode);

    Optional<Asset> findBySerialNumber(String serialNumber);
    boolean existsBySerialNumber(String serialNumber);

    boolean existsByHostName(String hostName);
    // TODO
    // Replace with database sequence
    // before production deployment
    Optional<Asset> findTopByOrderByIdDesc();
    boolean existsByHostNameAndIdNot(String hostName, Long id);

    boolean existsBySerialNumberAndIdNot(String serialNumber, Long id);
    long countByStatus(AssetStatus status);

    @Query("""
    SELECT new com.example.asset_management.dashboard.dto.AssetStatusChartResponse(
    CAST(a.status as string),
    COUNT(a)
    )
    FROM Asset a
    GROUP BY a.status
    """)
    List<AssetStatusChartResponse> getAssetStatusChart();

    List<Asset> findByStatusIn(List<AssetStatus> statuses);

    @Query("""
SELECT new com.example.asset_management.dashboard.dto.DepartmentAssetChartResponse(
d.departmentName,
COUNT(a)
)
FROM Asset a
JOIN a.department d
GROUP BY d.departmentName
ORDER BY COUNT(a) DESC
""")
    List<DepartmentAssetChartResponse> getDepartmentAssetChart();
}