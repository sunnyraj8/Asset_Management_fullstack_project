import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-stepper.html',
  styleUrl: './lifecycle-stepper.css'
})
export class LifecycleStepper {

  currentStatus = input.required<string>();

  readonly flow = [

    'NEW',
    'IN_STOCK',
    'UNDER_CONFIGURATION',
    'READY_TO_HANDOVER',
    'ALLOCATED',
    'RETURNED',
    'SCRAPPED'

  ];

  isCompleted(status: string): boolean {

    return this.flow.indexOf(status)
      < this.flow.indexOf(this.currentStatus());

  }

  isCurrent(status: string): boolean {

    return status === this.currentStatus();

  }

}
