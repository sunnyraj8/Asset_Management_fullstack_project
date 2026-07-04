package com.example.asset_management.allocation.repository;

import com.example.asset_management.allocation.entity.Allocation;
import com.example.asset_management.allocation.entity.AllocationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AllocationRepository
        extends JpaRepository<Allocation, Long> {

    Optional<Allocation> findByAssetIdAndStatus(
            Long assetId,
            AllocationStatus status);

    Optional<Allocation> findByIdAndStatus(
            Long id,
            AllocationStatus status);

    Optional<Allocation> findByAssetAssetCode(
            String assetCode);

    Page<Allocation> findByStatus(
            AllocationStatus status,
            Pageable pageable);

    long countByStatus(
            AllocationStatus status);

    @Query("""
SELECT a
FROM Allocation a
WHERE
LOWER(a.asset.assetCode) LIKE LOWER(CONCAT('%', :keyword, '%'))
OR LOWER(CONCAT(a.employee.firstName,' ',a.employee.lastName))
LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    Page<Allocation> search(
            @Param("keyword") String keyword,
            Pageable pageable);
}