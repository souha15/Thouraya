import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVenteListFinComponent } from './service-vente-list-fin.component';

describe('ServiceVenteListFinComponent', () => {
  let component: ServiceVenteListFinComponent;
  let fixture: ComponentFixture<ServiceVenteListFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceVenteListFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVenteListFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
