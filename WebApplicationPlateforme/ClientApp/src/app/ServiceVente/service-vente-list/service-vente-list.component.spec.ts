import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVenteListComponent } from './service-vente-list.component';

describe('ServiceVenteListComponent', () => {
  let component: ServiceVenteListComponent;
  let fixture: ComponentFixture<ServiceVenteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceVenteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
