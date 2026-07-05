package com.example.asset_management.department.service;

import com.example.asset_management.department.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DepartmentService {

    DepartmentResponse createDepartment(CreateDepartmentRequest request);

    DepartmentResponse getDepartmentById(Long id);

    Page<DepartmentResponse> getAllDepartments(Pageable pageable);

    DepartmentResponse updateDepartment(
            Long id,
            UpdateDepartmentRequest request);

    DepartmentResponse getDepartmentByCode(
            String departmentCode);
    Page<DepartmentResponse> searchDepartments(
            String keyword,
            Pageable pageable);
}