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

import { AssetStatusChart } from '../../../../core/models/asset-status-chart';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})
export class PieChartComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  data = input.required<AssetStatusChart[]>();

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

    const config: ChartConfiguration<'pie'> = {

      type: 'pie',

      data: {

        labels: items.map(x => x.status),

        datasets: [

          {

            data: items.map(x => x.count),

            backgroundColor: [

              '#1976d2',
              '#43a047',
              '#fb8c00',
              '#8e24aa',
              '#ef5350',
              '#26a69a',
              '#5c6bc0',
              '#ff7043'

            ],

            borderWidth: 2

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            position: 'bottom'

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
