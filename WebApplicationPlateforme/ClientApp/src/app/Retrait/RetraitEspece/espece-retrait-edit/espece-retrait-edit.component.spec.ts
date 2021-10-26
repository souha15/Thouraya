import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceRetraitEditComponent } from './espece-retrait-edit.component';

describe('EspeceRetraitEditComponent', () => {
  let component: EspeceRetraitEditComponent;
  let fixture: ComponentFixture<EspeceRetraitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceRetraitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceRetraitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
