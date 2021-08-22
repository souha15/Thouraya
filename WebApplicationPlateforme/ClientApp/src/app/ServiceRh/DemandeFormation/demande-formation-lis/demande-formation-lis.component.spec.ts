import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationLisComponent } from './demande-formation-lis.component';

describe('DemandeFormationLisComponent', () => {
  let component: DemandeFormationLisComponent;
  let fixture: ComponentFixture<DemandeFormationLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormationLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormationLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
