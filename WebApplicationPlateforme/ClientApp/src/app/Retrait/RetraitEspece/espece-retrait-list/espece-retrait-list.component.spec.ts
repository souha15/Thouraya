import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceRetraitListComponent } from './espece-retrait-list.component';

describe('EspeceRetraitListComponent', () => {
  let component: EspeceRetraitListComponent;
  let fixture: ComponentFixture<EspeceRetraitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceRetraitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceRetraitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
