import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVenteAddComponent } from './service-vente-add.component';

describe('ServiceVenteAddComponent', () => {
  let component: ServiceVenteAddComponent;
  let fixture: ComponentFixture<ServiceVenteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceVenteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVenteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
