package com.example.asset_management.employee.service;

import com.example.asset_management.employee.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(CreateEmployeeRequest request);
    EmployeeResponse getEmployeeById(Long id);

    Page<EmployeeResponse> getAllEmployees(Pageable pageable);

    EmployeeResponse updateEmployee(
            Long id,
            UpdateEmployeeRequest request);

    EmployeeResponse getEmployeeByCode(
            String employeeCode);

    EmployeeResponse updateEmployeeStatus(
            Long id,
            UpdateEmployeeStatusRequest request);

    List<ActiveEmployeeResponse> getActiveEmployees();

    Page<EmployeeResponse> searchEmployees(
            String keyword,
            Pageable pageable);
}