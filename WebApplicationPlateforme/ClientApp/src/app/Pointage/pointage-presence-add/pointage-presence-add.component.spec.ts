import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointagePresenceAddComponent } from './pointage-presence-add.component';

describe('PointagePresenceAddComponent', () => {
  let component: PointagePresenceAddComponent;
  let fixture: ComponentFixture<PointagePresenceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointagePresenceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointagePresenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
