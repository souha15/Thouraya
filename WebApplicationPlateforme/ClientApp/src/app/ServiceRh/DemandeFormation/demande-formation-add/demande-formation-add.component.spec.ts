import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationAddComponent } from './demande-formation-add.component';

describe('DemandeFormationAddComponent', () => {
  let component: DemandeFormationAddComponent;
  let fixture: ComponentFixture<DemandeFormationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
