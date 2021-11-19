import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyPaymentNonescrowComponent } from './agency-payment-nonescrow.component';

describe('AgencyPaymentNonescrowComponent', () => {
  let component: AgencyPaymentNonescrowComponent;
  let fixture: ComponentFixture<AgencyPaymentNonescrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyPaymentNonescrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyPaymentNonescrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
