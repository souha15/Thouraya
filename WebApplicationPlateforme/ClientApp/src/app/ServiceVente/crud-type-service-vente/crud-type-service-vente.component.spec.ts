import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTypeServiceVenteComponent } from './crud-type-service-vente.component';

describe('CrudTypeServiceVenteComponent', () => {
  let component: CrudTypeServiceVenteComponent;
  let fixture: ComponentFixture<CrudTypeServiceVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTypeServiceVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTypeServiceVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
