import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDirOrdrePayComponent } from './list-dir-ordre-pay.component';

describe('ListDirOrdrePayComponent', () => {
  let component: ListDirOrdrePayComponent;
  let fixture: ComponentFixture<ListDirOrdrePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDirOrdrePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDirOrdrePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
