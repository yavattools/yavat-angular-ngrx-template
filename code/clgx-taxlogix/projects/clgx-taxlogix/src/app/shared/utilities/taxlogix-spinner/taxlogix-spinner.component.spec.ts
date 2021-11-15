import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxlogixSpinnerComponent } from './taxlogix-spinner.component';

describe('TaxlogixSpinnerComponent', () => {
  let component: TaxlogixSpinnerComponent;
  let fixture: ComponentFixture<TaxlogixSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxlogixSpinnerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxlogixSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
