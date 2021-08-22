import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2ListComponent } from './ticket2-list.component';

describe('Ticket2ListComponent', () => {
  let component: Ticket2ListComponent;
  let fixture: ComponentFixture<Ticket2ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
