import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionEquipementListRhComponent } from './reception-equipement-list-rh.component';

describe('ReceptionEquipementListRhComponent', () => {
  let component: ReceptionEquipementListRhComponent;
  let fixture: ComponentFixture<ReceptionEquipementListRhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionEquipementListRhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionEquipementListRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
