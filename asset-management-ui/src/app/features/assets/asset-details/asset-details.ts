import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AssetService } from '../../../core/services/asset';
import { Asset } from '../../../core/models/asset';
import { FormsModule } from '@angular/forms';
import { LifecycleStepper } from '../components/lifecycle-stepper/lifecycle-stepper';
import { LifecycleGraph } from '../../../shared/components/lifecycle-graph/lifecycle-graph';

@Component({
  selector: 'app-asset-details',
  standalone: true,
  imports: [CommonModule, FormsModule, LifecycleStepper],
  templateUrl: './asset-details.html',
  styleUrl: './asset-details.css',
})
export class AssetDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assetService = inject(AssetService);
  availableStatuses: string[] = [];

  selectedStatus = '';
  asset?: Asset;

  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.assetService.getAsset(id).subscribe({
      next: (asset) => {
        this.asset = asset;

        this.loadNextStatuses();

        this.loading = false;
      },

      error: (err) => {
        console.error(err);

        this.loading = false;
      },
    });
  }
  updateStatus(): void {
    if (!this.asset) {
      return;
    }

    this.assetService
      .updateAssetStatus(
        this.asset.id,

        {
          status: this.selectedStatus,
        },
      )
      .subscribe({
        next: (asset) => {
          this.asset = asset;

          this.loadNextStatuses();
        },

        error: (err) => {
          alert(err.error?.message ?? 'Unable to update status.');
        },
      });
  }

  private loadNextStatuses(): void {
    if (!this.asset) {
      return;
    }

    this.assetService.getNextStatuses(this.asset.id).subscribe({
      next: (statuses) => {
        this.availableStatuses = statuses;

        this.selectedStatus = statuses[0] ?? '';
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
  back() {
    this.router.navigate(['/assets']);
  }
}
