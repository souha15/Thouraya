import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2DetailsComponent } from './ticket2-details.component';

describe('Ticket2DetailsComponent', () => {
  let component: Ticket2DetailsComponent;
  let fixture: ComponentFixture<Ticket2DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
