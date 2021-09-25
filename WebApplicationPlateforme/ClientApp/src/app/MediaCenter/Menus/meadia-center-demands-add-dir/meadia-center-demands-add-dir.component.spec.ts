import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeadiaCenterDemandsAddDirComponent } from './meadia-center-demands-add-dir.component';

describe('MeadiaCenterDemandsAddDirComponent', () => {
  let component: MeadiaCenterDemandsAddDirComponent;
  let fixture: ComponentFixture<MeadiaCenterDemandsAddDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeadiaCenterDemandsAddDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeadiaCenterDemandsAddDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
