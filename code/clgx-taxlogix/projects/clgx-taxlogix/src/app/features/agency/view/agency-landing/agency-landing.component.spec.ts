import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../../../shared/shared.module';

import { AgencyLandingComponent } from './agency-landing.component';

describe('AgencyLandingComponent', () => {
  let component: AgencyLandingComponent;
  let fixture: ComponentFixture<AgencyLandingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SharedModule,
          NoopAnimationsModule,
          TranslateModule.forRoot()
        ],
        declarations: [AgencyLandingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
