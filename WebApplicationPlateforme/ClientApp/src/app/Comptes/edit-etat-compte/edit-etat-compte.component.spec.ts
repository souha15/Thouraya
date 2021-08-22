import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtatCompteComponent } from './edit-etat-compte.component';

describe('EditEtatCompteComponent', () => {
  let component: EditEtatCompteComponent;
  let fixture: ComponentFixture<EditEtatCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEtatCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEtatCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
