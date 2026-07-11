import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { PageResponse } from '../models/page-response';
import { AssetHistory } from '../models/asset-history';

@Injectable({
  providedIn: 'root'
})
export class AssetHistoryService {

  private http = inject(HttpClient);

  getHistory(
    page = 0,
    size = 10
  ): Observable<PageResponse<AssetHistory>> {

    return this.http.get<PageResponse<AssetHistory>>(
      `${environment.apiUrl}/history?page=${page}&size=${size}`
    );

  }

  searchHistory(
    keyword: string,
    page = 0,
    size = 10
  ): Observable<PageResponse<AssetHistory>> {

    return this.http.get<PageResponse<AssetHistory>>(
      `${environment.apiUrl}/history/search?keyword=${keyword}&page=${page}&size=${size}`
    );

  }

  filterByAction(
    action: string,
    page = 0,
    size = 10
  ): Observable<PageResponse<AssetHistory>> {

    return this.http.get<PageResponse<AssetHistory>>(
      `${environment.apiUrl}/history/action?action=${action}&page=${page}&size=${size}`
    );

  }

}
