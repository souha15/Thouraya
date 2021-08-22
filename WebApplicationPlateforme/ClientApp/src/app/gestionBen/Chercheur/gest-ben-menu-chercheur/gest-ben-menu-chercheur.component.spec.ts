import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenMenuChercheurComponent } from './gest-ben-menu-chercheur.component';

describe('GestBenMenuChercheurComponent', () => {
  let component: GestBenMenuChercheurComponent;
  let fixture: ComponentFixture<GestBenMenuChercheurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenMenuChercheurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenMenuChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
