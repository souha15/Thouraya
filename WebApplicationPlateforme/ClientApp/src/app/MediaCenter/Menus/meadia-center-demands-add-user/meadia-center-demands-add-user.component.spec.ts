import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeadiaCenterDemandsAddUserComponent } from './meadia-center-demands-add-user.component';

describe('MeadiaCenterDemandsAddUserComponent', () => {
  let component: MeadiaCenterDemandsAddUserComponent;
  let fixture: ComponentFixture<MeadiaCenterDemandsAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeadiaCenterDemandsAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeadiaCenterDemandsAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
