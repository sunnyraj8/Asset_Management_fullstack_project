import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DepartmentService } from '../../../core/services/department';
import { SnackbarService } from '../../../shared/services/snackbar';

import { DepartmentForm } from '../department-form/department-form';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [
    DepartmentForm
  ],
  templateUrl: './create-department.html'
})
export class CreateDepartment {

  private departmentService = inject(DepartmentService);

  private snackbar = inject(SnackbarService);

  private router = inject(Router);

  save(request: any) {

    this.departmentService
      .createDepartment(request)
      .subscribe({

        next: () => {

          this.snackbar.success(
            'Department created successfully'
          );

          this.router.navigate([
            '/departments'
          ]);

        },

        error: err => {

          console.error(err);

          this.snackbar.error(
            'Unable to create Department'
          );

        }

      });

  }

}
