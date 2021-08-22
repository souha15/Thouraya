import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementListComponent } from './equipement-list.component';

describe('EquipementListComponent', () => {
  let component: EquipementListComponent;
  let fixture: ComponentFixture<EquipementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
