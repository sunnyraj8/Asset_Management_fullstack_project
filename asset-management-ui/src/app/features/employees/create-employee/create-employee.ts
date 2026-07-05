import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeForm } from '../employee-form/employee-form';

import { EmployeeService } from '../../../core/services/employee';
import { SnackbarService } from '../../../shared/services/snackbar';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    EmployeeForm
  ],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.css'
})
export class CreateEmployee {

  private employeeService = inject(EmployeeService);

  private snackbar = inject(SnackbarService);

  private router = inject(Router);

  loading = false;

  save(request: any) {

    this.loading = true;

    this.employeeService.createEmployee(request)
      .subscribe({

        next: () => {

          this.loading = false;

          this.snackbar.success("Employee created successfully");

          this.router.navigate(['/employees']);

        },

        error: err => {

          console.error(err);

          this.loading = false;

          this.snackbar.error("Unable to create employee");

        }

      });

  }

}
