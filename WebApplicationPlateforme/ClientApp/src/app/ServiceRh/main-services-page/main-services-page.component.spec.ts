import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServicesPageComponent } from './main-services-page.component';

describe('MainServicesPageComponent', () => {
  let component: MainServicesPageComponent;
  let fixture: ComponentFixture<MainServicesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainServicesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
