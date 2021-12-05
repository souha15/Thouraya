import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVenteListDotComponent } from './service-vente-list-dot.component';

describe('ServiceVenteListDotComponent', () => {
  let component: ServiceVenteListDotComponent;
  let fixture: ComponentFixture<ServiceVenteListDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceVenteListDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVenteListDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
