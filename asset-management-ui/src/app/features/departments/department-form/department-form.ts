import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css'
})
export class DepartmentForm implements OnInit {

  @Input()
  initialData?: {

    departmentName: string;

  };

  @Input()
  buttonText = 'Save';

  @Output()
  save = new EventEmitter<any>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      departmentName: [

        this.initialData?.departmentName ?? '',

        Validators.required

      ]

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
