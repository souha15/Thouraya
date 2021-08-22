import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblMenuComponent } from './tbl-menu.component';

describe('TblMenuComponent', () => {
  let component: TblMenuComponent;
  let fixture: ComponentFixture<TblMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
