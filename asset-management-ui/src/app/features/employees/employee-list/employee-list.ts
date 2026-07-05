import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';

import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { SnackbarService } from '../../../shared/services/snackbar';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,

    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,

    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);

  employees: Employee[] = [];

  loading = false;

  page = 0;

  size = 10;
  private dialog = inject(MatDialog);

  private snackbar = inject(SnackbarService);
  totalElements = 0;
  keyword = '';
  displayedColumns = ['employeeCode', 'name', 'department', 'designation', 'status', 'action'];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;

    this.employeeService.getEmployees(this.page, this.size).subscribe({
      next: (response) => {
        this.employees = response.content;

        this.totalElements = response.totalElements;

        this.loading = false;
      },

      error: (err) => {
        console.error(err);

        this.loading = false;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;

    this.size = event.pageSize;

    if (this.keyword.trim()) {
      this.search();
    } else {
      this.loadEmployees();
    }
  }
  search() {
    if (!this.keyword.trim()) {
      this.loadEmployees();

      return;
    }

    this.loading = true;

    this.employeeService.searchEmployees(this.keyword, this.page, this.size).subscribe({
      next: (response) => {
        this.employees = response.content;

        this.totalElements = response.totalElements;

        this.loading = false;
      },

      error: (err) => {
        console.error(err);

        this.loading = false;
      },
    });
  }

  toggleStatus(employee: Employee) {

    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {
        width: '420px',

        data: {

          title: employee.active
            ? 'Deactivate Employee'
            : 'Activate Employee',

          message: employee.active

            ? `Are you sure you want to deactivate ${employee.firstName} ${employee.lastName}?`

            : `Are you sure you want to activate ${employee.firstName} ${employee.lastName}?`

        }

      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (!result) return;

      this.employeeService
        .updateEmployeeStatus(
          employee.id,
          !employee.active
        )
        .subscribe({

          next: updated => {

            employee.active = updated.active;

            this.snackbar.success(

              updated.active
                ? 'Employee activated successfully'
                : 'Employee deactivated successfully'

            );

          },

          error: () => {

            this.snackbar.error(

              'Unable to update employee status'

            );

          }

        });

    });

  }
}
