import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Employee } from '../models/employee';
import { PageResponse } from '../../core/models/page-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  getEmployees(
    page: number = 0,
    size: number = 10
  ): Observable<PageResponse<Employee>> {

    return this.http.get<PageResponse<Employee>>(
      `${environment.apiUrl}/employees?page=${page}&size=${size}`
    );

  }

  getEmployee(id: number): Observable<Employee> {

    return this.http.get<Employee>(
      `${environment.apiUrl}/employees/${id}`
    );

  }
  createEmployee(request: any): Observable<Employee> {

    return this.http.post<Employee>(
      `${environment.apiUrl}/employees`,
      request
    );

  }

  updateEmployee(id: number, request: any): Observable<Employee> {

    return this.http.put<Employee>(
      `${environment.apiUrl}/employees/${id}`,
      request
    );

  }

  searchEmployees(
    keyword: string,
    page: number = 0,
    size: number = 10
  ): Observable<PageResponse<Employee>> {

    return this.http.get<PageResponse<Employee>>(
      `${environment.apiUrl}/employees/search?keyword=${keyword}&page=${page}&size=${size}`
    );

  }

  updateEmployeeStatus(
    id: number,
    active: boolean
  ): Observable<Employee> {

    return this.http.put<Employee>(
      `${environment.apiUrl}/employees/${id}/status`,
      {
        active
      }
    );

  }

}
