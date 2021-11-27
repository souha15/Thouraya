import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsCommentsComponent } from './tickets-comments.component';

describe('TicketsCommentsComponent', () => {
  let component: TicketsCommentsComponent;
  let fixture: ComponentFixture<TicketsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
