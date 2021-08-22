import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetCompteComponent } from './projet-compte.component';

describe('ProjetCompteComponent', () => {
  let component: ProjetCompteComponent;
  let fixture: ComponentFixture<ProjetCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
