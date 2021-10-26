import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceRetraitDetailsComponent } from './espece-retrait-details.component';

describe('EspeceRetraitDetailsComponent', () => {
  let component: EspeceRetraitDetailsComponent;
  let fixture: ComponentFixture<EspeceRetraitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceRetraitDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceRetraitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
