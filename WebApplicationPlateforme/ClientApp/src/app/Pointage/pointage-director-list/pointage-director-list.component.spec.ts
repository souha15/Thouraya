import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageDirectorListComponent } from './pointage-director-list.component';

describe('PointageDirectorListComponent', () => {
  let component: PointageDirectorListComponent;
  let fixture: ComponentFixture<PointageDirectorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageDirectorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageDirectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
