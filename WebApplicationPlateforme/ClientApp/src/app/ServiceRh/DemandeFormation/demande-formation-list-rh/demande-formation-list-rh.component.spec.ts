import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationListRhComponent } from './demande-formation-list-rh.component';

describe('DemandeFormationListRhComponent', () => {
  let component: DemandeFormationListRhComponent;
  let fixture: ComponentFixture<DemandeFormationListRhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormationListRhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormationListRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
