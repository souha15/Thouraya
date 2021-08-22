import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2ListEtabComponent } from './ticket2-list-etab.component';

describe('Ticket2ListEtabComponent', () => {
  let component: Ticket2ListEtabComponent;
  let fixture: ComponentFixture<Ticket2ListEtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2ListEtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2ListEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
