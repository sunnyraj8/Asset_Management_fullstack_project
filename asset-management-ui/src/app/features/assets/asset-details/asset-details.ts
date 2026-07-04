import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AssetService } from '../../../core/services/asset';
import { Asset } from '../../../core/models/asset';

@Component({
  selector: 'app-asset-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-details.html',
  styleUrl: './asset-details.css'
})
export class AssetDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assetService = inject(AssetService);

  asset?: Asset;

  loading = true;

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.assetService.getAsset(id).subscribe({

      next: (asset) => {

        this.asset = asset;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  back() {

    this.router.navigate(['/assets']);

  }

}
