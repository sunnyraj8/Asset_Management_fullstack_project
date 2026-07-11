import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AssetHistoryService } from '../../../../core/services/asset-history';
import { AssetHistory } from '../../../../core/models/asset-history';

@Component({
  selector: 'app-recent-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './recent-history.html',
  styleUrl: './recent-history.css'
})
export class RecentHistory implements OnInit {

  private historyService = inject(AssetHistoryService);

  histories: AssetHistory[] = [];

  loading = true;

  ngOnInit(): void {

    this.historyService
      .getHistory(0, 5)
      .subscribe({

        next: response => {

          this.histories = response.content;

          this.loading = false;

        },

        error: error => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  getChipClass(action: string): string {

    switch (action) {

      case 'CREATED':
        return 'created';

      case 'UPDATED':
        return 'updated';

      case 'ALLOCATED':
        return 'allocated';

      case 'RETURNED':
        return 'returned';

      case 'SCRAPPED':
        return 'scrapped';

      default:
        return 'default';

    }

  }

}
