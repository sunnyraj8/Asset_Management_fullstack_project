import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LifecycleNode {

  status: string;

  label: string;

  level: number;

  column: number;

  parents: string[];
}

@Component({
  selector: 'app-lifecycle-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-graph.html',
  styleUrl: './lifecycle-graph.css'
})
export class LifecycleGraph {

  currentStatus = input.required<string>();

  readonly nodes: LifecycleNode[] = [

    {
      status: 'NEW',
      label: 'New',
      level: 0,
      column: 2,
      parents: []
    },

    {
      status: 'IN_STOCK',
      label: 'In Stock',
      level: 1,
      column: 2,
      parents: ['NEW']
    },

    {
      status: 'UNDER_CONFIGURATION',
      label: 'Configuration',
      level: 2,
      column: 2,
      parents: ['IN_STOCK', 'RETURNED']
    },

    {
      status: 'READY_TO_HANDOVER',
      label: 'Ready',
      level: 3,
      column: 2,
      parents: [
        'UNDER_CONFIGURATION',
        'UNDER_REPAIR'
      ]
    },

    {
      status: 'ALLOCATED',
      label: 'Allocated',
      level: 4,
      column: 2,
      parents: ['READY_TO_HANDOVER']
    },

    {
      status: 'RETURNED',
      label: 'Returned',
      level: 5,
      column: 2,
      parents: ['ALLOCATED']
    },

    {
      status: 'UNDER_REPAIR',
      label: 'Repair',
      level: 3,
      column: 4,
      parents: [
        'DAMAGED',
        'RETURNED'
      ]
    },

    {
      status: 'DAMAGED',
      label: 'Damaged',
      level: 2,
      column: 4,
      parents: [
        'IN_STOCK',
        'ALLOCATED',
        'RETURNED'
      ]
    },

    {
      status: 'LOST',
      label: 'Lost',
      level: 2,
      column: 0,
      parents: [
        'IN_STOCK',
        'ALLOCATED',
        'RETURNED'
      ]
    },

    {
      status: 'SCRAPPED',
      label: 'Scrapped',
      level: 5,
      column: 4,
      parents: [
        'RETURNED',
        'UNDER_REPAIR',
        'DAMAGED',
        'LOST'
      ]
    }

  ];

  private readonly mainFlow = [
    'NEW',
    'IN_STOCK',
    'UNDER_CONFIGURATION',
    'READY_TO_HANDOVER',
    'ALLOCATED',
    'RETURNED'
  ];

  isCurrent(status: string): boolean {

    return this.currentStatus() === status;

  }

  isCompleted(status: string): boolean {

    const currentIndex =
      this.mainFlow.indexOf(this.currentStatus());

    const nodeIndex =
      this.mainFlow.indexOf(status);

    if (currentIndex === -1 || nodeIndex === -1) {

      return false;

    }

    return nodeIndex < currentIndex;

  }

}
