import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRevenusComponent } from './service-revenus.component';

describe('ServiceRevenusComponent', () => {
  let component: ServiceRevenusComponent;
  let fixture: ComponentFixture<ServiceRevenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRevenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRevenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
