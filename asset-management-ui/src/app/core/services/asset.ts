import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Asset } from '../models/asset';
import { CreateAssetRequest } from '../models/create-asset-request';
import { PageResponse } from '../models/page-response';
import { API } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private http = inject(HttpClient);

  getAssets(
    page:number=0,
    size:number=10
  ):Observable<PageResponse<Asset>>{

    return this.http.get<PageResponse<Asset>>(
      `${environment.apiUrl}/assets?page=${page}&size=${size}`
    );

  }
  getAsset(id: number): Observable<Asset> {
    return this.http.get<Asset>(
      `${environment.apiUrl}${API.ASSETS}/${id}`
    );
  }
  searchAsset(assetCode: string): Observable<Asset> {

    return this.http.get<Asset>(
      `${environment.apiUrl}/assets/search?assetCode=${assetCode}`
    );

  }
  createAsset(request: CreateAssetRequest): Observable<Asset> {

    return this.http.post<Asset>(
      `${environment.apiUrl}/assets`,
      request
    );

  }

  updateAsset(id: number, request: any): Observable<Asset> {

    return this.http.put<Asset>(
      `${environment.apiUrl}${API.ASSETS}/${id}`,
      request
    );

  }

}
