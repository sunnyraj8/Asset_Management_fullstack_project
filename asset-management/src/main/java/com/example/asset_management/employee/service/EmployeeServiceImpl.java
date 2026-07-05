package com.example.asset_management.employee.service;

import com.example.asset_management.department.entity.Department;
import com.example.asset_management.department.repository.DepartmentRepository;
import com.example.asset_management.employee.dto.CreateEmployeeRequest;
import com.example.asset_management.employee.dto.EmployeeResponse;
import com.example.asset_management.employee.entity.Employee;
import com.example.asset_management.employee.repository.EmployeeRepository;
import com.example.asset_management.exception.DuplicateResourceException;
import com.example.asset_management.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.asset_management.employee.dto.UpdateEmployeeRequest;
import com.example.asset_management.employee.dto.UpdateEmployeeStatusRequest;
import com.example.asset_management.employee.dto.ActiveEmployeeResponse;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public EmployeeResponse createEmployee(CreateEmployeeRequest request) {

        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (employeeRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new DuplicateResourceException("Phone Number already exists");
        }

        Department department =
                departmentRepository.findById(request.getDepartmentId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Department not found"));

        String employeeCode = generateEmployeeCode();

        Employee employee = Employee.builder()
                .employeeCode(employeeCode)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .designation(request.getDesignation())
                .department(department)
                .active(true)
                .build();

        employeeRepository.save(employee);

        return mapToResponse(employee);
    }

    private String generateEmployeeCode() {

        long nextNumber = employeeRepository
                .findAll()
                .stream()
                .mapToLong(Employee::getId)
                .max()
                .orElse(0L) + 1;

        return String.format("EMP-%05d", nextNumber);
    }
    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        return mapToResponse(employee);
    }
    @Override
    public Page<EmployeeResponse> getAllEmployees(Pageable pageable) {

        return employeeRepository.findAll(pageable)
                .map(this::mapToResponse);

    }
    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            UpdateEmployeeRequest request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        if (employeeRepository.existsByEmailAndIdNot(request.getEmail(), id)) {
            throw new DuplicateResourceException("Email already exists");
        }

        if (employeeRepository.existsByPhoneNumberAndIdNot(request.getPhoneNumber(), id)) {
            throw new DuplicateResourceException("Phone Number already exists");
        }

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setDesignation(request.getDesignation());
        employee.setDepartment(department);

        employeeRepository.save(employee);

        return mapToResponse(employee);
    }
    @Override
    public EmployeeResponse getEmployeeByCode(String employeeCode) {

        Employee employee = employeeRepository.findByEmployeeCode(employeeCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        return mapToResponse(employee);
    }

    @Override
    public EmployeeResponse updateEmployeeStatus(
            Long id,
            UpdateEmployeeStatusRequest request) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        employee.setActive(request.getActive());

        employeeRepository.save(employee);

        return mapToResponse(employee);
    }

    @Override
    public List<ActiveEmployeeResponse> getActiveEmployees() {

        return employeeRepository
                .findByActiveTrue()
                .stream()
                .map(employee ->
                        ActiveEmployeeResponse.builder()
                                .id(employee.getId())
                                .employeeCode(employee.getEmployeeCode())
                                .fullName(
                                        employee.getFirstName()
                                                + " "
                                                + employee.getLastName())
                                .designation(employee.getDesignation())
                                .build())
                .toList();

    }

    @Override
    public Page<EmployeeResponse> searchEmployees(
            String keyword,
            Pageable pageable) {

        return employeeRepository
                .findByEmployeeCodeContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        pageable
                )
                .map(this::mapToResponse);
    }
    private EmployeeResponse mapToResponse(Employee employee) {

        return EmployeeResponse.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phoneNumber(employee.getPhoneNumber())
                .designation(employee.getDesignation())
                .departmentId(employee.getDepartment().getId())
                .department(employee.getDepartment().getDepartmentName())
                .active(employee.getActive())
                .build();
    }
}