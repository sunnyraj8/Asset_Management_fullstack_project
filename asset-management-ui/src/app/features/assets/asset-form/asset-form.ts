import { Component, EventEmitter, Input, OnInit, Output, inject,OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Asset } from '../../../core/models/asset';
import { DepartmentService } from '../../../core/services/department';
import { EmployeeService } from '../../../core/services/employee';

import { Department } from '../../../core/models/department';
import { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './asset-form.html',
  styleUrl: './asset-form.css'
})
export class AssetForm implements OnInit ,OnChanges{

  @Input()
  asset: Asset | null = null;

  @Input()
  buttonText = "Save Asset";

  private fb = inject(FormBuilder);

  private departmentService = inject(DepartmentService);

  private employeeService = inject(EmployeeService);

  @Input()
  loading = false;
  @Input()
  title = "Create Asset";
  @Output()
  save = new EventEmitter<any>();

  departments: Department[] = [];

  employees: Employee[] = [];

  form = this.fb.group({

      manufacturerYear: this.fb.control<number | null>(null),

    brand: ['', Validators.required],

    model: ['', Validators.required],

    hostName: ['', Validators.required],

    serialNumber: ['', Validators.required],

    cpu: [''],

    ram: [''],

    ssd: [''],

    operatingSystem: [''],

    officeVersion: [''],

    powerAdapterSerial: [''],

    warrantyStartDate: [''],

    warrantyEndDate: [''],

    departmentId: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    engineerId: this.fb.control<number | null>(
      null,
      Validators.required
    )

  });

  ngOnInit(): void {

    this.loadDepartments();

    this.loadEmployees();

  }
  ngOnChanges() {

    if (!this.asset) {

      return;

    }

    this.form.patchValue({

      manufacturerYear: this.asset.manufacturerYear,

      brand: this.asset.brand,

      model: this.asset.model,

      hostName: this.asset.hostName,

      serialNumber: this.asset.serialNumber,

      cpu: this.asset.cpu,

      ram: this.asset.ram,

      ssd: this.asset.ssd,

      operatingSystem: this.asset.operatingSystem,

      officeVersion: this.asset.officeVersion,

      powerAdapterSerial: this.asset.powerAdapterSerial,

      warrantyStartDate: this.asset.warrantyStartDate,

      warrantyEndDate: this.asset.warrantyEndDate,

      departmentId: this.asset.departmentId,

      engineerId: this.asset.engineerId

    });

  }

  loadDepartments() {

    this.departmentService.getDepartments().subscribe(res => {

      this.departments = res.content;

    });

  }

  loadEmployees() {

    this.employeeService.getEmployees().subscribe(res => {

      this.employees = res.content;

    });

  }


  submit() {

    console.log("Submit clicked");

    console.log(this.form.value);

    console.log(this.form.valid);

    console.log(this.form.errors);

    if (this.form.invalid) {

      console.log("Form Invalid");

      this.form.markAllAsTouched();

      return;

    }

    console.log("Emitting Save");

    this.save.emit(this.form.value);

  }

}
