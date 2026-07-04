import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationDetails } from './allocation-details';

describe('AllocationDetails', () => {
  let component: AllocationDetails;
  let fixture: ComponentFixture<AllocationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocationDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
