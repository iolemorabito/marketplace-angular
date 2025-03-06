import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCarrelloComponent } from './feature-carrello.component';

describe('FeatureCarrelloComponent', () => {
  let component: FeatureCarrelloComponent;
  let fixture: ComponentFixture<FeatureCarrelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureCarrelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCarrelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
