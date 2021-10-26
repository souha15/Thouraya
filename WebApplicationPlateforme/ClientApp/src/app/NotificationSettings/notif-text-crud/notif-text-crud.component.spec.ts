import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifTextCrudComponent } from './notif-text-crud.component';

describe('NotifTextCrudComponent', () => {
  let component: NotifTextCrudComponent;
  let fixture: ComponentFixture<NotifTextCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifTextCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifTextCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
