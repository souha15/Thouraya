import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteForWomensComponent } from './activite-for-womens.component';

describe('ActiviteForWomensComponent', () => {
  let component: ActiviteForWomensComponent;
  let fixture: ComponentFixture<ActiviteForWomensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteForWomensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteForWomensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
