import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblMainComponent } from './tbl-main.component';

describe('TblMainComponent', () => {
  let component: TblMainComponent;
  let fixture: ComponentFixture<TblMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
