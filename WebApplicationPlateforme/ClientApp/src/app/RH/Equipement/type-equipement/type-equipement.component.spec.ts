import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEquipementComponent } from './type-equipement.component';

describe('TypeEquipementComponent', () => {
  let component: TypeEquipementComponent;
  let fixture: ComponentFixture<TypeEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
