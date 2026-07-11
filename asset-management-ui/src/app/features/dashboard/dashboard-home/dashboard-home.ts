import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../components/bar-chart/bar-chart';
import { DashboardService } from '../../../core/services/dashboard';

import { DashboardSummary } from '../../../core/models/dashboard-summary';
import { AssetStatusChart } from '../../../core/models/asset-status-chart';
import { DepartmentAssetChart } from '../../../core/models/department-asset-chart';

import { SummaryCard } from '../components/summary-card/summary-card';
import { PieChartComponent } from '../components/pie-chart/pie-chart';
import { RecentHistory } from '../components/recent-history/recent-history';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, SummaryCard, PieChartComponent, BarChartComponent, RecentHistory],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome implements OnInit {
  private dashboardService = inject(DashboardService);

  loading = true;

  summary?: DashboardSummary;

  assetStatusChart: AssetStatusChart[] = [];

  departmentChart: DepartmentAssetChart[] = [];

  ngOnInit(): void {
    this.loadDashboard();

    this.loadAssetStatusChart();

    this.loadDepartmentChart();
  }

  private loadDashboard(): void {
    this.dashboardService.getSummary().subscribe({
      next: (response) => {
        this.summary = response;

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
      },
    });
  }

  private loadAssetStatusChart(): void {
    this.dashboardService.getAssetStatusChart().subscribe({
      next: (response) => {
        this.assetStatusChart = response;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadDepartmentChart(): void {
    this.dashboardService.getDepartmentChart().subscribe({
      next: (response) => {
        this.departmentChart = response;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
