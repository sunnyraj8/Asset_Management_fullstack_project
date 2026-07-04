package com.example.asset_management.employee.controller;

import com.example.asset_management.employee.dto.*;
import com.example.asset_management.employee.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public EmployeeResponse createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request) {

        return employeeService.createEmployee(request);
    }

    @GetMapping
    public Page<EmployeeResponse> getAllEmployees(Pageable pageable) {

        return employeeService.getAllEmployees(pageable);

    }

    @GetMapping("/active")
    public List<ActiveEmployeeResponse> getActiveEmployees() {

        return employeeService.getActiveEmployees();

    }

    @GetMapping("/search")
    public EmployeeResponse getEmployeeByCode(
            @RequestParam String employeeCode) {

        return employeeService.getEmployeeByCode(employeeCode);
    }
    @GetMapping("/{id}")
    public EmployeeResponse getEmployeeById(@PathVariable Long id) {

        return employeeService.getEmployeeById(id);

    }


    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody UpdateEmployeeRequest request) {

        return employeeService.updateEmployee(id, request);
    }



    @PutMapping("/{id}/status")
    public EmployeeResponse updateEmployeeStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateEmployeeStatusRequest request) {

        return employeeService.updateEmployeeStatus(id, request);
    }
}