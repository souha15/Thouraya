import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2MyListComponent } from './ticket2-my-list.component';

describe('Ticket2MyListComponent', () => {
  let component: Ticket2MyListComponent;
  let fixture: ComponentFixture<Ticket2MyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2MyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2MyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
