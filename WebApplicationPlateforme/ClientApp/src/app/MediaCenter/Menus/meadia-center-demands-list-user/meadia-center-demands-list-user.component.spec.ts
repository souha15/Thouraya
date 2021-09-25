import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeadiaCenterDemandsListUserComponent } from './meadia-center-demands-list-user.component';

describe('MeadiaCenterDemandsListUserComponent', () => {
  let component: MeadiaCenterDemandsListUserComponent;
  let fixture: ComponentFixture<MeadiaCenterDemandsListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeadiaCenterDemandsListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeadiaCenterDemandsListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
