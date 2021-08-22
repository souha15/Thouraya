import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdrePayComponent } from './add-ordre-pay.component';

describe('AddOrdrePayComponent', () => {
  let component: AddOrdrePayComponent;
  let fixture: ComponentFixture<AddOrdrePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrdrePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdrePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
