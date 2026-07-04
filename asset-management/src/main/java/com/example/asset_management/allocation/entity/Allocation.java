package com.example.asset_management.allocation.entity;

import com.example.asset_management.asset.entity.Asset;
import com.example.asset_management.common.entity.BaseEntity;
import com.example.asset_management.employee.entity.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "asset_allocations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Allocation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private LocalDate allocatedDate;

    private LocalDate expectedReturnDate;

    private LocalDate returnedDate;

    private String remarks;

    @Enumerated(EnumType.STRING)
    private AllocationStatus status;
}