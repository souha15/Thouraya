import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifShowComponent } from './notif-show.component';

describe('NotifShowComponent', () => {
  let component: NotifShowComponent;
  let fixture: ComponentFixture<NotifShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
