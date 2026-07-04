import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';

import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);

  employees: Employee[] = [];

  loading = false;

  page = 0;

  size = 10;

  totalElements = 0;

  displayedColumns = [
    'employeeCode',
    'name',
    'department',
    'designation',
    'status',
    'action'
  ];

  ngOnInit(): void {

    this.loadEmployees();

  }

  loadEmployees() {

    this.loading = true;

    this.employeeService
      .getEmployees(this.page, this.size)
      .subscribe({

        next: response => {

          this.employees = response.content;

          this.totalElements = response.totalElements;

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  onPageChange(event: PageEvent) {

    this.page = event.pageIndex;

    this.size = event.pageSize;

    this.loadEmployees();

  }

}
