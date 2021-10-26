import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceRetraitListActiveComponent } from './espece-retrait-list-active.component';

describe('EspeceRetraitListActiveComponent', () => {
  let component: EspeceRetraitListActiveComponent;
  let fixture: ComponentFixture<EspeceRetraitListActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceRetraitListActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceRetraitListActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
