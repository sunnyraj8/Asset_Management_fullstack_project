package com.example.asset_management.employee.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActiveEmployeeResponse {

    private Long id;

    private String employeeCode;

    private String fullName;

    private String designation;

}