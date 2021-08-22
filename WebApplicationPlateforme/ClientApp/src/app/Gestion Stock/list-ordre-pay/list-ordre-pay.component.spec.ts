import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdrePayComponent } from './list-ordre-pay.component';

describe('ListOrdrePayComponent', () => {
  let component: ListOrdrePayComponent;
  let fixture: ComponentFixture<ListOrdrePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrdrePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdrePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
