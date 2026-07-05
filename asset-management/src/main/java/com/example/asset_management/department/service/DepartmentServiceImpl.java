package com.example.asset_management.department.service;

import com.example.asset_management.department.dto.*;
import com.example.asset_management.department.entity.Department;
import com.example.asset_management.department.repository.DepartmentRepository;
import com.example.asset_management.exception.DuplicateResourceException;
import com.example.asset_management.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public DepartmentResponse createDepartment(CreateDepartmentRequest request) {

        if (departmentRepository.existsByDepartmentName(request.getDepartmentName())) {
            throw new DuplicateResourceException("Department already exists");
        }

        Department department = Department.builder()
                .departmentCode(generateDepartmentCode())
                .departmentName(request.getDepartmentName())
                .build();

        departmentRepository.save(department);

        return mapToResponse(department);
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));

        return mapToResponse(department);
    }

    @Override
    public Page<DepartmentResponse> getAllDepartments(Pageable pageable) {

        return departmentRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Override
    public DepartmentResponse updateDepartment(
            Long id,
            UpdateDepartmentRequest request) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));

        if (departmentRepository.existsByDepartmentNameAndIdNot(
                request.getDepartmentName(),
                id)) {

            throw new DuplicateResourceException("Department already exists");
        }

        department.setDepartmentName(request.getDepartmentName());

        departmentRepository.save(department);

        return mapToResponse(department);
    }

    @Override
    public DepartmentResponse getDepartmentByCode(String departmentCode) {

        Department department = departmentRepository
                .findByDepartmentCode(departmentCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));

        return mapToResponse(department);
    }

    private String generateDepartmentCode() {

        long nextNumber = departmentRepository.findAll()
                .stream()
                .mapToLong(Department::getId)
                .max()
                .orElse(0L) + 1;

        return String.format("DEP-%05d", nextNumber);
    }
    @Override
    public Page<DepartmentResponse> searchDepartments(
            String keyword,
            Pageable pageable) {

        return departmentRepository
                .search(keyword, pageable)
                .map(this::mapToResponse);

    }
    private DepartmentResponse mapToResponse(Department department) {

        return DepartmentResponse.builder()
                .id(department.getId())
                .departmentCode(department.getDepartmentCode())
                .departmentName(department.getDepartmentName())
                .build();
    }

}