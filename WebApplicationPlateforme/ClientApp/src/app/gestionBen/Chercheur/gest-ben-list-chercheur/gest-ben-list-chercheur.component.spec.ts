import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenListChercheurComponent } from './gest-ben-list-chercheur.component';

describe('GestBenListChercheurComponent', () => {
  let component: GestBenListChercheurComponent;
  let fixture: ComponentFixture<GestBenListChercheurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenListChercheurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenListChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
