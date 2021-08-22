import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationUserAddComponent } from './demande-formation-user-add.component';

describe('DemandeFormationUserAddComponent', () => {
  let component: DemandeFormationUserAddComponent;
  let fixture: ComponentFixture<DemandeFormationUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormationUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormationUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
