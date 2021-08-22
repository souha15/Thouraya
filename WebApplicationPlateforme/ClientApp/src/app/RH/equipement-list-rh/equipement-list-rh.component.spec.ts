import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementListRHComponent } from './equipement-list-rh.component';

describe('EquipementListRHComponent', () => {
  let component: EquipementListRHComponent;
  let fixture: ComponentFixture<EquipementListRHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipementListRHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementListRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
