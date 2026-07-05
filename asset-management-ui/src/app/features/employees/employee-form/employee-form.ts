import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Department } from '../../../core/models/department';
import { Employee } from '../../../core/models/employee';

import { DepartmentService } from '../../../core/services/department';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit, OnChanges {

  private fb = inject(FormBuilder);

  private departmentService = inject(DepartmentService);

  @Input()
  employee: Employee | null = null;

  @Input()
  loading = false;

  @Input()
  buttonText = 'Save Employee';

  @Output()
  save = new EventEmitter<any>();

  departments: Department[] = [];

  form = this.fb.group({

    firstName: ['', Validators.required],

    lastName: ['', Validators.required],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    phoneNumber: ['', Validators.required],

    designation: ['', Validators.required],

    departmentId: [null as number | null, Validators.required]

  });

  ngOnInit(): void {

    this.loadDepartments();

  }

  ngOnChanges(): void {

    if (!this.employee) {

      return;

    }

    const department = this.departments.find(
      d => d.departmentName === this.employee!.department
    );

    this.form.patchValue({

      firstName: this.employee.firstName,

      lastName: this.employee.lastName,

      email: this.employee.email,

      phoneNumber: this.employee.phoneNumber,

      designation: this.employee.designation,

      departmentId: this.employee.departmentId

    });

  }

  loadDepartments() {

    this.departmentService
      .getDepartments()
      .subscribe(response => {

        this.departments = response.content;


      });

  }

  submit() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.save.emit(this.form.value);

  }

}
