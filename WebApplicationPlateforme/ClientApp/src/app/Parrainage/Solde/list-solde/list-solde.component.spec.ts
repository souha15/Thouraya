import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoldeComponent } from './list-solde.component';

describe('ListSoldeComponent', () => {
  let component: ListSoldeComponent;
  let fixture: ComponentFixture<ListSoldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSoldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
