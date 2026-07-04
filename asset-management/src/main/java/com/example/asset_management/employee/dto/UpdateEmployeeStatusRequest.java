package com.example.asset_management.employee.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateEmployeeStatusRequest {

    @NotNull
    private Boolean active;

}