import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2ListUserComponent } from './ticket2-list-user.component';

describe('Ticket2ListUserComponent', () => {
  let component: Ticket2ListUserComponent;
  let fixture: ComponentFixture<Ticket2ListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2ListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
