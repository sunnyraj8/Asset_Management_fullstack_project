import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AssetForm } from '../asset-form/asset-form';

import { AssetService } from '../../../core/services/asset';
import { CreateAssetRequest } from '../../../core/models/create-asset-request';
import { SnackbarService } from '../../../shared/services/snackbar';

@Component({
  selector: 'app-create-asset',
  standalone: true,
  imports: [
    AssetForm
  ],
  templateUrl: './create-asset.html',
  styleUrl: './create-asset.css'
})
export class CreateAsset {

  private assetService = inject(AssetService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  loading = false;

  save(request: CreateAssetRequest) {
    console.log("Received Request");

    console.log(request);
    this.loading = true;

    this.assetService.createAsset(request).subscribe({

      next: () => {

        this.loading = false;

        this.snackbar.success(
          "Asset Created Successfully"
        );

        this.router.navigate(['/assets']);

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

        this.snackbar.error(
          "Unable to create Asset"
        );

      }

    });

  }

}
