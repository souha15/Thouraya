import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEquipementComponent } from './my-equipement.component';

describe('MyEquipementComponent', () => {
  let component: MyEquipementComponent;
  let fixture: ComponentFixture<MyEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
