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

}
