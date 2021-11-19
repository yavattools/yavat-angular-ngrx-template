import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyPaymentEscrowComponent } from './agency-payment-escrow.component';

describe('AgencyPaymentEscrowComponent', () => {
  let component: AgencyPaymentEscrowComponent;
  let fixture: ComponentFixture<AgencyPaymentEscrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyPaymentEscrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyPaymentEscrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
