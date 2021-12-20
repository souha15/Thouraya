import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteCompagneListComponent } from './activite-compagne-list.component';

describe('ActiviteCompagneListComponent', () => {
  let component: ActiviteCompagneListComponent;
  let fixture: ComponentFixture<ActiviteCompagneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteCompagneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteCompagneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
