package com.example.asset_management.department.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateDepartmentRequest {

    @NotBlank(message = "Department Name is required")
    private String departmentName;

}