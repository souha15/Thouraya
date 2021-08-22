import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppEquipementComponent } from './supp-equipement.component';

describe('SuppEquipementComponent', () => {
  let component: SuppEquipementComponent;
  let fixture: ComponentFixture<SuppEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
