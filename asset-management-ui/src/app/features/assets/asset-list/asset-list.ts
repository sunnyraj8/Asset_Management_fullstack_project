import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AssetService } from '../../../core/services/asset';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Asset } from '../../../core/models/asset';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({

  selector:'app-asset-list',

  standalone:true,

  imports:[
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    RouterLink,
    RouterModule,
    FormsModule,
    MatPaginatorModule
  ],

  templateUrl:'./asset-list.html',

  styleUrl:'./asset-list.css'

})

export class AssetList implements OnInit{

  private assetService=inject(AssetService);

  loading=true;

  assets:Asset[]=[];
  page = 0;

  size = 10;

  totalElements = 0;
  searchAssetCode = '';
  displayedColumns: string[] = [
    'assetCode',
    'brand',
    'model',
    'status',
    'action'
  ];

  ngOnInit():void{

    this.loadAssets();

  }

  loadAssets(): void {

    this.loading = true;

    this.assetService.getAssets(
      this.page,
      this.size
    ).subscribe({

      next: (response) => {

        this.assets = response.content;

        this.totalElements = response.totalElements;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  onPageChange(event: any) {

    this.page = event.pageIndex;

    this.size = event.pageSize;

    this.loadAssets();

  }
  search() {

    if (!this.searchAssetCode.trim()) {

      this.loadAssets();

      return;

    }

    this.loading = true;

    this.assetService.searchAsset(
      this.searchAssetCode
    ).subscribe({

      next: (asset) => {

        this.assets = [asset];

        this.loading = false;

      },

      error: () => {

        this.assets = [];

        this.loading = false;

        alert("Asset not found");

      }

    });

  }

  reset() {

    this.searchAssetCode = '';

    this.loadAssets();

  }
  getStatusClass(status: string): string {

    switch (status) {

      case 'NEW':
        return 'status-new';

      case 'ALLOCATED':
        return 'status-allocated';

      case 'RETURNED':
        return 'status-returned';

      case 'SCRAPPED':
        return 'status-scrapped';

      default:
        return '';

    }

  }

}
