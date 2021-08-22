import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageListComponent } from './pointage-list.component';

describe('PointageListComponent', () => {
  let component: PointageListComponent;
  let fixture: ComponentFixture<PointageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
