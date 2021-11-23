import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgencyCollectionPracticeComponent } from './edit-agency-collection-practice.component';

describe('EditAgencyCollectionPracticeComponent', () => {
  let component: EditAgencyCollectionPracticeComponent;
  let fixture: ComponentFixture<EditAgencyCollectionPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAgencyCollectionPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAgencyCollectionPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
