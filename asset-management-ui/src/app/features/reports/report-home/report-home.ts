import { Component } from '@angular/core';
import { ReportCard } from '../components/report-card/report-card';

@Component({
  selector: 'app-report-home',
  imports: [ReportCard],
  templateUrl: './report-home.html',
  styleUrl: './report-home.css',
})
export class ReportHome {}
