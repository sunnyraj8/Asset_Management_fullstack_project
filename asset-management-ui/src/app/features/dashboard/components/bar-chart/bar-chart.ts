import {
  Component,
  ElementRef,
  ViewChild,
  input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';

import { DepartmentAssetChart } from '../../../../core/models/department-asset-chart';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css'
})
export class BarChartComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  data = input.required<DepartmentAssetChart[]>();

  @ViewChild('canvas')
  canvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  private viewReady = false;

  ngAfterViewInit(): void {

    this.viewReady = true;

    this.renderChart();

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']) {

      this.renderChart();

    }

  }

  ngOnDestroy(): void {

    this.chart?.destroy();

  }

  private renderChart(): void {

    if (!this.viewReady) {

      return;

    }

    if (!this.canvas) {

      return;

    }

    const items = this.data();

    if (!items.length) {

      return;

    }

    this.chart?.destroy();

    const config: ChartConfiguration<'bar'> = {

      type: 'bar',

      data: {

        labels: items.map(x => x.department),

        datasets: [

          {

            label: 'Assets',

            data: items.map(x => x.count),

            backgroundColor: '#1976d2',

            borderRadius: 8

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            display: false

          }

        },

        scales: {

          y: {

            beginAtZero: true,

            ticks: {

              precision: 0

            }

          }

        }

      }

    };

    this.chart = new Chart(

      this.canvas.nativeElement,

      config

    );

  }

}
