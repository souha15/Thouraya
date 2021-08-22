import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionEquipementListComponent } from './reception-equipement-list.component';

describe('ReceptionEquipementListComponent', () => {
  let component: ReceptionEquipementListComponent;
  let fixture: ComponentFixture<ReceptionEquipementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionEquipementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionEquipementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
