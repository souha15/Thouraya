import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionEquipementAddComponent } from './reception-equipement-add.component';

describe('ReceptionEquipementAddComponent', () => {
  let component: ReceptionEquipementAddComponent;
  let fixture: ComponentFixture<ReceptionEquipementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionEquipementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionEquipementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
