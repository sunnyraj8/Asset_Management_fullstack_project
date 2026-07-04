import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateAsset } from './allocate-asset';

describe('AllocateAsset', () => {
  let component: AllocateAsset;
  let fixture: ComponentFixture<AllocateAsset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocateAsset],
    }).compileComponents();

    fixture = TestBed.createComponent(AllocateAsset);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
