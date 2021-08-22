import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenEditChercheurComponent } from './gest-ben-edit-chercheur.component';

describe('GestBenEditChercheurComponent', () => {
  let component: GestBenEditChercheurComponent;
  let fixture: ComponentFixture<GestBenEditChercheurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenEditChercheurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenEditChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
