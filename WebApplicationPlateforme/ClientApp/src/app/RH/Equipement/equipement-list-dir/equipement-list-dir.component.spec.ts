import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementListDirComponent } from './equipement-list-dir.component';

describe('EquipementListDirComponent', () => {
  let component: EquipementListDirComponent;
  let fixture: ComponentFixture<EquipementListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipementListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
