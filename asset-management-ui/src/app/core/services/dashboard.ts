import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API } from '../constants/api.constants';

import { DashboardSummary } from '../models/dashboard-summary';
import { AssetStatusChart } from '../models/asset-status-chart';
import { DepartmentAssetChart } from '../models/department-asset-chart';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getSummary(): Observable<DashboardSummary> {

    return this.http.get<DashboardSummary>(
      environment.apiUrl + API.DASHBOARD
    );

  }

  getAssetStatusChart(): Observable<AssetStatusChart[]> {

    return this.http.get<AssetStatusChart[]>(
      environment.apiUrl + API.ASSET_STATUS_CHART
    );

  }

  getDepartmentChart(): Observable<DepartmentAssetChart[]> {

    return this.http.get<DepartmentAssetChart[]>(
      environment.apiUrl + '/dashboard/department-chart'
    );

  }

}
