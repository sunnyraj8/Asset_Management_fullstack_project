import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AvailableAsset } from '../models/available-asset';
import { ActiveEmployee } from '../models/active-employee';
import { PageResponse } from '../models/page-response';
import { Allocation } from '../models/allocation';
import { CreateAllocationRequest } from '../models/create-allocation-request';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  private http = inject(HttpClient);

  getAllocations(
    page = 0,
    size = 10
  ): Observable<PageResponse<Allocation>> {

    return this.http.get<PageResponse<Allocation>>(
      `${environment.apiUrl}/allocations?page=${page}&size=${size}`
    );

  }

  getActiveAllocations(): Observable<PageResponse<Allocation>> {

    return this.http.get<PageResponse<Allocation>>(
      `${environment.apiUrl}/allocations/active`
    );

  }

  allocateAsset(request: CreateAllocationRequest) {

    return this.http.post(
      `${environment.apiUrl}/allocations`,
      request
    );

  }

  returnAsset(id: number) {

    return this.http.put(
      `${environment.apiUrl}/allocations/${id}/return`,
      {}
    );

  }

  getAvailableAssets(): Observable<AvailableAsset[]> {

    return this.http.get<AvailableAsset[]>(
      `${environment.apiUrl}/assets/available`
    );

  }

  getActiveEmployees(): Observable<ActiveEmployee[]> {

    return this.http.get<ActiveEmployee[]>(
      `${environment.apiUrl}/employees/active`
    );

  }

  searchAllocations(
    keyword: string,
    page = 0,
    size = 10
  ) {

    return this.http.get<PageResponse<Allocation>>(
      `${environment.apiUrl}/allocations/search?keyword=${keyword}&page=${page}&size=${size}`
    );

  }



}
