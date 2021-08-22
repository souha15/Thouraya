import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRespOrdrePayComponent } from './list-resp-ordre-pay.component';

describe('ListRespOrdrePayComponent', () => {
  let component: ListRespOrdrePayComponent;
  let fixture: ComponentFixture<ListRespOrdrePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRespOrdrePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRespOrdrePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
