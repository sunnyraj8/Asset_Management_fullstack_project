package com.example.asset_management.department.controller;

import com.example.asset_management.department.dto.*;
import com.example.asset_management.department.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public DepartmentResponse createDepartment(
            @Valid @RequestBody CreateDepartmentRequest request) {

        return departmentService.createDepartment(request);
    }

    @GetMapping("/{id}")
    public DepartmentResponse getDepartmentById(
            @PathVariable Long id) {

        return departmentService.getDepartmentById(id);
    }

    @GetMapping
    public Page<DepartmentResponse> getAllDepartments(
            Pageable pageable) {

        return departmentService.getAllDepartments(pageable);
    }

    @PutMapping("/{id}")
    public DepartmentResponse updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody UpdateDepartmentRequest request) {

        return departmentService.updateDepartment(id, request);
    }

    @GetMapping("/search")
    public DepartmentResponse getDepartmentByCode(
            @RequestParam String departmentCode) {

        return departmentService.getDepartmentByCode(departmentCode);
    }

}