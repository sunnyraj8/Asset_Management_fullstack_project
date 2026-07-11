import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { DepartmentList } from './features/departments/department-list/department-list';
import { DepartmentDetails } from './features/departments/department-details/department-details';
import { CreateDepartment } from './features/departments/create-department/create-department';
import { EditDepartment } from './features/departments/edit-department/edit-department';
import { HistoryList } from './features/asset-history/history-list/history-list';
import { ReportHome } from './features/reports/report-home/report-home';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(c => c.Login)
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout')
        .then(c => c.AdminLayout),

    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard-home/dashboard-home')
            .then(c => c.DashboardHome)
      },
      {
        path: 'assets',
        loadComponent: () =>
          import('./features/assets/asset-list/asset-list')
            .then(c => c.AssetList)
      },
      {
        path: 'assets/create',
        loadComponent: () =>
          import('./features/assets/create-asset/create-asset')
            .then(c => c.CreateAsset)
      },
      {
        path: 'assets/:id',
        loadComponent: () =>
          import('./features/assets/asset-details/asset-details')
            .then(c => c.AssetDetails)
      },
      {
        path: 'assets/edit/:id',
        loadComponent: () =>
          import('./features/assets/edit-asset/edit-asset')
            .then(c => c.EditAsset)
      },
      {
        path: 'allocations',
        loadComponent: () =>
          import('./features/allocations/allocation-list/allocation-list')
            .then(c => c.AllocationList)
      },

      {
        path: 'allocations/create',
        loadComponent: () =>
          import('./features/allocations/allocate-asset/allocate-asset')
            .then(c => c.AllocateAsset)
      },

      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employees/employee-list/employee-list')
            .then(c => c.EmployeeList)
      },
      {
        path: 'employees/create',
        loadComponent: () =>
          import('./features/employees/create-employee/create-employee')
            .then(c => c.CreateEmployee)
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./features/employees/employee-details/employee-details')
            .then(c => c.EmployeeDetails)
      },
      {
        path: 'employees/edit/:id',
        loadComponent: () =>
          import('./features/employees/edit-employee/edit-employee')
            .then(c => c.EditEmployee)
      },

      {
        path: 'departments',
        component: DepartmentList
      },

      {
        path: 'departments/create',
        component: CreateDepartment
      },

      {
        path: 'departments/edit/:id',
        component: EditDepartment
      },

      {
        path: 'departments/:id',
        component: DepartmentDetails
      },

      {
        path: 'asset-history',
        component: HistoryList
      },

      {
        path: 'reports',
        component: ReportHome
      },
    ]

  }

];
