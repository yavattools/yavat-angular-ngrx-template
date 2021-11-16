import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFrequencyComponent } from './collection-frequency.component';

describe('CollectionFrequencyComponent', () => {
  let component: CollectionFrequencyComponent;
  let fixture: ComponentFixture<CollectionFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionFrequencyComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
