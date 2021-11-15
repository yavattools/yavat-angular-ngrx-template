import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateLinkComponent } from './validate-link.component';

describe('ValidateLinkComponent', () => {
  let component: ValidateLinkComponent;
  let fixture: ComponentFixture<ValidateLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateLinkComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
