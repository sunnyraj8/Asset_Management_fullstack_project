import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';

import { AllocationForm } from '../allocation-form/allocation-form';

import { AllocationService } from '../../../core/services/allocation';

import { SnackbarService } from '../../../shared/services/snackbar';

import { CreateAllocationRequest } from '../../../core/models/create-allocation-request';

@Component({
  selector: 'app-allocate-asset',
  standalone: true,
  imports: [
    AllocationForm
  ],
  templateUrl: './allocate-asset.html',
  styleUrl: './allocate-asset.css'
})
export class AllocateAsset {

  private allocationService = inject(AllocationService);

  private snackbar = inject(SnackbarService);

  private router = inject(Router);

  save(request: CreateAllocationRequest) {

    this.allocationService
      .allocateAsset(request)
      .subscribe({

        next: () => {

          this.snackbar.success(
            'Asset allocated successfully'
          );

          this.router.navigate([
            '/allocations'
          ]);

        },

        error: () => {

          this.snackbar.error(
            'Unable to allocate asset'
          );

        }

      });

  }

}
