import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBanqueLisComponent } from './service-banque-lis.component';

describe('ServiceBanqueLisComponent', () => {
  let component: ServiceBanqueLisComponent;
  let fixture: ComponentFixture<ServiceBanqueLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceBanqueLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBanqueLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
