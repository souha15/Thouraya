import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdrePayComponent } from './edit-ordre-pay.component';

describe('EditOrdrePayComponent', () => {
  let component: EditOrdrePayComponent;
  let fixture: ComponentFixture<EditOrdrePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrdrePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdrePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
