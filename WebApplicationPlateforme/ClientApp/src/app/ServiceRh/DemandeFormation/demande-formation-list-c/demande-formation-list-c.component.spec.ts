import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationListCComponent } from './demande-formation-list-c.component';

describe('DemandeFormationListCComponent', () => {
  let component: DemandeFormationListCComponent;
  let fixture: ComponentFixture<DemandeFormationListCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormationListCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormationListCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
