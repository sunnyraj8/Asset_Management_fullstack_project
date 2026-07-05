package com.example.asset_management.department.repository;

import com.example.asset_management.department.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentCode(String departmentCode);

    boolean existsByDepartmentName(String departmentName);

    boolean existsByDepartmentNameAndIdNot(String departmentName, Long id);
    @Query("""
    SELECT d
    FROM Department d
    WHERE LOWER(d.departmentCode) LIKE LOWER(CONCAT('%', :keyword, '%'))
       OR LOWER(d.departmentName) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    Page<Department> search(
            @Param("keyword") String keyword,
            Pageable pageable
    );
}