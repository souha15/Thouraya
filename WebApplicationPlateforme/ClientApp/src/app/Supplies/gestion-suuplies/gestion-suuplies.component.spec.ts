import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSuupliesComponent } from './gestion-suuplies.component';

describe('GestionSuupliesComponent', () => {
  let component: GestionSuupliesComponent;
  let fixture: ComponentFixture<GestionSuupliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSuupliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSuupliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
