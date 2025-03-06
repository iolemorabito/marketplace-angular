import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureChisiamoComponent } from './feature-chisiamo.component';

describe('FeatureChisiamoComponent', () => {
  let component: FeatureChisiamoComponent;
  let fixture: ComponentFixture<FeatureChisiamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureChisiamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureChisiamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
