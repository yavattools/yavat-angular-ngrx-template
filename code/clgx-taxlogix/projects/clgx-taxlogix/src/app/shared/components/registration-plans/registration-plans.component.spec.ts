import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPlansComponent } from './registration-plans.component';

describe('RegistrationPlansComponent', () => {
  let component: RegistrationPlansComponent;
  let fixture: ComponentFixture<RegistrationPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationPlansComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
