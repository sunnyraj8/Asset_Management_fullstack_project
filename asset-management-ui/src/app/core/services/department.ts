import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Department } from '../models/department';
import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);

  getDepartments(
    page = 0,
    size = 10
  ): Observable<PageResponse<Department>> {

    return this.http.get<PageResponse<Department>>(
      `${environment.apiUrl}/departments?page=${page}&size=${size}`
    );

  }

  getDepartment(id: number): Observable<Department> {

    return this.http.get<Department>(
      `${environment.apiUrl}/departments/${id}`
    );

  }

  createDepartment(request: {
    departmentName: string;
  }): Observable<Department> {

    return this.http.post<Department>(
      `${environment.apiUrl}/departments`,
      request
    );

  }

  updateDepartment(
    id: number,
    request: {
      departmentName: string;
    }
  ): Observable<Department> {

    return this.http.put<Department>(
      `${environment.apiUrl}/departments/${id}`,
      request
    );

  }

  searchDepartments(
    keyword: string,
    page = 0,
    size = 10
  ): Observable<PageResponse<Department>> {

    return this.http.get<PageResponse<Department>>(
      `${environment.apiUrl}/departments/search?keyword=${keyword}&page=${page}&size=${size}`
    );

  }

}
