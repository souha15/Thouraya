import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageAddComponent } from './pointage-add.component';

describe('PointageAddComponent', () => {
  let component: PointageAddComponent;
  let fixture: ComponentFixture<PointageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
