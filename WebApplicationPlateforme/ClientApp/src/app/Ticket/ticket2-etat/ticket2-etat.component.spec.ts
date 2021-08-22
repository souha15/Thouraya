import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ticket2EtatComponent } from './ticket2-etat.component';

describe('Ticket2EtatComponent', () => {
  let component: Ticket2EtatComponent;
  let fixture: ComponentFixture<Ticket2EtatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ticket2EtatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ticket2EtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
