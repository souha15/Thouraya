import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteCompagneAddComponent } from './activite-compagne-add.component';

describe('ActiviteCompagneAddComponent', () => {
  let component: ActiviteCompagneAddComponent;
  let fixture: ComponentFixture<ActiviteCompagneAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteCompagneAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteCompagneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
