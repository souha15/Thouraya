import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetPayActiviteComponent } from './projet-pay-activite.component';

describe('ProjetPayActiviteComponent', () => {
  let component: ProjetPayActiviteComponent;
  let fixture: ComponentFixture<ProjetPayActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetPayActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetPayActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
