import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../../core/services/dashboard';
import { DashboardSummary } from '../../../core/models/dashboard-summary';
import { AssetStatusChart } from '../../../core/models/asset-status-chart';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome implements OnInit {

  private dashboardService = inject(DashboardService);

  loading = true;

  summary?: DashboardSummary;

  assetStatusChart: AssetStatusChart[] = [];

  ngOnInit(): void {

    this.loadDashboard();

    this.loadAssetStatusChart();

  }

  loadDashboard(): void {

    this.dashboardService.getSummary().subscribe({

      next: (response) => {

        this.summary = response;

        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

      }

    });

  }

  loadAssetStatusChart(): void {

    this.dashboardService.getAssetStatusChart().subscribe({

      next: (response) => {

        this.assetStatusChart = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
