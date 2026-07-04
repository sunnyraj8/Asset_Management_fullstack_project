import { Injectable, inject } from '@angular/core';
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

  getDepartments(): Observable<PageResponse<Department>> {

    return this.http.get<PageResponse<Department>>(
      `${environment.apiUrl}/departments`
    );

  }

}
