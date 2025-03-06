import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureContattiComponent } from './feature-contatti.component';

describe('FeatureContattiComponent', () => {
  let component: FeatureContattiComponent;
  let fixture: ComponentFixture<FeatureContattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureContattiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureContattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
