import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeadiaCenterDemandsListDirComponent } from './meadia-center-demands-list-dir.component';

describe('MeadiaCenterDemandsListDirComponent', () => {
  let component: MeadiaCenterDemandsListDirComponent;
  let fixture: ComponentFixture<MeadiaCenterDemandsListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeadiaCenterDemandsListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeadiaCenterDemandsListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
