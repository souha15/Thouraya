import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdminOrdrePayComponent } from './list-admin-ordre-pay.component';

describe('ListAdminOrdrePayComponent', () => {
  let component: ListAdminOrdrePayComponent;
  let fixture: ComponentFixture<ListAdminOrdrePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdminOrdrePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdminOrdrePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
