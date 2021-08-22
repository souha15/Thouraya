import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBanqueAddComponent } from './service-banque-add.component';

describe('ServiceBanqueAddComponent', () => {
  let component: ServiceBanqueAddComponent;
  let fixture: ComponentFixture<ServiceBanqueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceBanqueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBanqueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
