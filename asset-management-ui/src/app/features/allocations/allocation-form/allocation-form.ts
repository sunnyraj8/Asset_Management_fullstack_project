import {
  Component,
  EventEmitter,
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

import { AllocationService } from '../../../core/services/allocation';

import { AvailableAsset } from '../../../core/models/available-asset';
import { ActiveEmployee } from '../../../core/models/active-employee';

@Component({
  selector: 'app-allocation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './allocation-form.html',
  styleUrl: './allocation-form.css'
})
export class AllocationForm implements OnInit {

  private fb = inject(FormBuilder);

  private allocationService = inject(AllocationService);

  @Output()
  save = new EventEmitter<any>();

  availableAssets: AvailableAsset[] = [];

  activeEmployees: ActiveEmployee[] = [];

  form = this.fb.group({

    assetId: [null, Validators.required],

    employeeId: [null, Validators.required],

    expectedReturnDate: ['', Validators.required],

    remarks: ['']

  });

  ngOnInit(): void {

    this.loadAssets();

    this.loadEmployees();

  }

  loadAssets() {

    this.allocationService
      .getAvailableAssets()
      .subscribe(res => {

        this.availableAssets = res;

      });

  }

  loadEmployees() {

    this.allocationService
      .getActiveEmployees()
      .subscribe(res => {

        this.activeEmployees = res;

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
