import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { AllocationService } from '../../../core/services/allocation';
import { Allocation } from '../../../core/models/allocation';
import { SnackbarService } from '../../../shared/services/snackbar';

@Component({
  selector: 'app-allocation-list',
  standalone: true,
    imports: [
      CommonModule,
      RouterLink,
      FormsModule,

      MatTableModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule
    ],
  templateUrl: './allocation-list.html',
  styleUrl: './allocation-list.css'
})
export class AllocationList implements OnInit {

  private allocationService = inject(AllocationService);

  loading = true;

  allocations: Allocation[] = [];
  keyword = '';
  page = 0;

  size = 10;
  private snackbar = inject(SnackbarService);
  totalElements = 0;


  displayedColumns = [
    'assetCode',
    'employeeName',
    'allocatedDate',
    'expectedReturnDate',
    'status',
    'action'
  ];

  ngOnInit(): void {

    this.loadAllocations();

  }

  loadAllocations() {

    this.loading = true;

    this.allocationService
      .getAllocations(this.page, this.size)
      .subscribe({

        next: (response) => {

          this.allocations = response.content;

          this.totalElements = response.totalElements;

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }
  returnAsset(id: number) {

    if (!confirm('Return this asset?')) {
      return;
    }

    this.allocationService
      .returnAsset(id)
      .subscribe({

        next: () => {

          this.snackbar.success(
            'Asset returned successfully'
          );

          this.loadAllocations();

        },

        error: (err) => {

          console.error(err);

          this.snackbar.error(
            'Unable to return asset'
          );

        }

      });

  }

  search() {

    if (!this.keyword.trim()) {

      this.loadAllocations();

      return;

    }

    this.loading = true;

    this.allocationService
      .searchAllocations(
        this.keyword,
        this.page,
        this.size)
      .subscribe({

        next: response => {

          this.allocations = response.content;

          this.totalElements = response.totalElements;

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

}
