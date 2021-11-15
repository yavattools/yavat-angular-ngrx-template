import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsconnectDialogComponent } from './letsconnect-dialog.component';

describe('LetsconnectDialogComponent', () => {
  let component: LetsconnectDialogComponent;
  let fixture: ComponentFixture<LetsconnectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetsconnectDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetsconnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
