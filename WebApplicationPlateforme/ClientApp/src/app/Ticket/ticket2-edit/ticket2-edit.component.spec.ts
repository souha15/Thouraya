import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2EditComponent } from './ticket2-edit.component';

describe('Ticket2EditComponent', () => {
  let component: Ticket2EditComponent;
  let fixture: ComponentFixture<Ticket2EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
