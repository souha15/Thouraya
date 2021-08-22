import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSoldeComponent } from './edit-solde.component';

describe('EditSoldeComponent', () => {
  let component: EditSoldeComponent;
  let fixture: ComponentFixture<EditSoldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSoldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
