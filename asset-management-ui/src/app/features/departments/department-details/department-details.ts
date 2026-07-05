import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DepartmentService } from '../../../core/services/department';
import { Department } from '../../../core/models/department';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './department-details.html',
  styleUrl: './department-details.css'
})
export class DepartmentDetails implements OnInit {

  private route = inject(ActivatedRoute);

  private departmentService = inject(DepartmentService);

  department?: Department;

  loading = false;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loading = true;

    this.departmentService
      .getDepartment(id)
      .subscribe({

        next: response => {

          this.department = response;

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

}
