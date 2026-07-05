import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeForm } from '../employee-form/employee-form';

import { Employee } from '../../../core/models/employee';

import { EmployeeService } from '../../../core/services/employee';
import { SnackbarService } from '../../../shared/services/snackbar';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    EmployeeForm
  ],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private employeeService = inject(EmployeeService);

  private snackbar = inject(SnackbarService);

  employee: Employee | null = null;

  loading = false;

  employeeId!: number;

  ngOnInit(): void {

    this.employeeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadEmployee();

  }

  loadEmployee() {

    this.loading = true;

    this.employeeService
      .getEmployee(this.employeeId)
      .subscribe({

        next: employee => {

          this.employee = employee;

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  save(request: any) {

    this.loading = true;

    this.employeeService
      .updateEmployee(
        this.employeeId,
        request
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.snackbar.success(
            'Employee updated successfully'
          );

          this.router.navigate(['/employees']);

        },

        error: err => {

          console.error(err);

          this.loading = false;

          this.snackbar.error(
            'Unable to update employee'
          );

        }

      });

  }

}
