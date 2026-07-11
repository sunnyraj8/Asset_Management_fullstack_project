import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatChipsModule
} from '@angular/material/chips';

import { AssetHistoryService } from '../../../core/services/asset-history';
import { AssetHistory } from '../../../core/models/asset-history';

@Component({

  selector:'history-list',

  standalone:true,

  imports:[

    CommonModule,
    RouterLink,
    FormsModule,

    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule

  ],

    templateUrl: './history-list.html',

    styleUrl: './history-list.css'

})

export class HistoryList implements OnInit{

  private historyService = inject(AssetHistoryService);

  histories: AssetHistory[] = [];

  loading=false;

  keyword='';

  action='';

  page=0;

  size=10;

  totalElements=0;

  displayedColumns=[

    'asset',

    'action',

    'date',

    'remarks'

  ];

  ngOnInit(){

    this.loadHistory();

  }

  loadHistory(){

    this.loading=true;

    this.historyService

      .getHistory(this.page,this.size)

      .subscribe({

        next:response=>{

          this.histories=response.content;

          this.totalElements=response.totalElements;

          this.loading=false;

        },

        error:()=>{

          this.loading=false;

        }

      });

  }

  search(){

    if(this.action){

      this.filter();

      return;

    }

    if(!this.keyword.trim()){

      this.loadHistory();

      return;

    }

    this.loading=true;

    this.historyService

      .searchHistory(

        this.keyword,

        this.page,

        this.size

      )

      .subscribe({

        next:r=>{

          this.histories=r.content;

          this.totalElements=r.totalElements;

          this.loading=false;

        },

        error:()=>this.loading=false

      });

  }

  filter(){

    if(!this.action){

      this.loadHistory();

      return;

    }

    this.loading=true;

    this.historyService

      .filterByAction(

        this.action,

        this.page,

        this.size

      )

      .subscribe({

        next:r=>{

          this.histories=r.content;

          this.totalElements=r.totalElements;

          this.loading=false;

        },

        error:()=>this.loading=false

      });

  }

  clear(){

    this.keyword='';

    this.action='';

    this.loadHistory();

  }

  onPageChange(event:PageEvent){

    this.page=event.pageIndex;

    this.size=event.pageSize;

    this.search();

  }

}
