import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceRetraitAddComponent } from './espece-retrait-add.component';

describe('EspeceRetraitAddComponent', () => {
  let component: EspeceRetraitAddComponent;
  let fixture: ComponentFixture<EspeceRetraitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceRetraitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceRetraitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
