import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2MenuComponent } from './ticket2-menu.component';

describe('Ticket2MenuComponent', () => {
  let component: Ticket2MenuComponent;
  let fixture: ComponentFixture<Ticket2MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
