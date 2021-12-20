import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteCompagneMenuComponent } from './activite-compagne-menu.component';

describe('ActiviteCompagneMenuComponent', () => {
  let component: ActiviteCompagneMenuComponent;
  let fixture: ComponentFixture<ActiviteCompagneMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteCompagneMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteCompagneMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
