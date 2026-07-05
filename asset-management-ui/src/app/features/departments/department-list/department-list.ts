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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DepartmentService } from '../../../core/services/department';
import { Department } from '../../../core/models/department';

@Component({
  selector: 'app-department-list',
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
    MatInputModule
  ],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css'
})
export class DepartmentList implements OnInit {

  private departmentService = inject(DepartmentService);

  departments: Department[] = [];

  loading = false;

  keyword = '';

  page = 0;

  size = 10;

  totalElements = 0;

  displayedColumns = [
    'departmentCode',
    'departmentName',
    'action'
  ];

  ngOnInit(): void {

    this.loadDepartments();

  }

  loadDepartments() {

    this.loading = true;

    this.departmentService
      .getDepartments(this.page, this.size)
      .subscribe({

        next: response => {

          this.departments = response.content;

          this.totalElements = response.totalElements;

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }


  search() {

    if (!this.keyword.trim()) {

      this.loadDepartments();

      return;

    }

    this.loading = true;

    this.departmentService
      .searchDepartments(
        this.keyword,
        this.page,
        this.size
      )
      .subscribe({

        next: response => {

          this.departments = response.content;

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

    if (this.keyword.trim()) {

      this.search();

    } else {

      this.loadDepartments();

    }

  }

}
