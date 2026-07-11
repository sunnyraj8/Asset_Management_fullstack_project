import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css'
})
export class SummaryCard {

  title = input.required<string>();

  value = input.required<number>();

  icon = input<string>('dashboard');

  color = input<string>('#1976d2');

}
