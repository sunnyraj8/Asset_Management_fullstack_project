import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './report-card.html',
  styleUrl: './report-card.css'
})
export class ReportCard {

  title = input.required<string>();

  description = input.required<string>();

  icon = input.required<string>();

  color = input<string>('#1976d2');

  route = input.required<string>();

}
