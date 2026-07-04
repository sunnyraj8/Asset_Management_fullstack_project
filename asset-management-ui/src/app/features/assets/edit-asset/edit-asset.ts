import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AssetForm } from '../asset-form/asset-form';

import { Asset } from '../../../core/models/asset';
import { AssetService } from '../../../core/services/asset';

@Component({
  selector: 'app-edit-asset',
  standalone: true,
  imports: [
    AssetForm
  ],
  templateUrl: './edit-asset.html',
  styleUrl: './edit-asset.css'
})
export class EditAsset implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private assetService = inject(AssetService);

  asset: Asset | null = null;

  loading = false;

  assetId!: number;

  ngOnInit(): void {

    this.assetId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadAsset();

  }

  loadAsset() {

    this.loading = true;

    this.assetService.getAsset(this.assetId).subscribe({

      next: (response) => {

        this.asset = response;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  update(request: any) {

    this.loading = true;

    this.assetService.updateAsset(
      this.assetId,
      request
    ).subscribe({

      next: () => {

        alert("Asset Updated Successfully");

        this.router.navigate(['/assets']);

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

}
