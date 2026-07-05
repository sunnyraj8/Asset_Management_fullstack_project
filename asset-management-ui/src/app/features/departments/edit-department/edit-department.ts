import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentService } from '../../../core/services/department';
import { SnackbarService } from '../../../shared/services/snackbar';

import { Department } from '../../../core/models/department';

import { DepartmentForm } from '../department-form/department-form';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [
    DepartmentForm
  ],
  templateUrl: './edit-department.html'
})
export class EditDepartment implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private departmentService = inject(DepartmentService);

  private snackbar = inject(SnackbarService);

  departmentId!: number;

  department?: Department;

  ngOnInit(): void {

    this.departmentId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.departmentService
      .getDepartment(this.departmentId)
      .subscribe({

        next: response => {

          this.department = response;

        },

        error: err => {

          console.error(err);

          this.snackbar.error(
            'Unable to load Department'
          );

          this.router.navigate([
            '/departments'
          ]);

        }

      });

  }

  save(request: any) {

    this.departmentService
      .updateDepartment(
        this.departmentId,
        request
      )
      .subscribe({

        next: () => {

          this.snackbar.success(
            'Department updated successfully'
          );

          this.router.navigate([
            '/departments'
          ]);

        },

        error: err => {

          console.error(err);

          this.snackbar.error(
            'Unable to update Department'
          );

        }

      });

  }

}
