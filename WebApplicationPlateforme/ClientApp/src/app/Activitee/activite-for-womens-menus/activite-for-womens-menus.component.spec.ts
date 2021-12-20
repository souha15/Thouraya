import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteForWomensMenusComponent } from './activite-for-womens-menus.component';

describe('ActiviteForWomensMenusComponent', () => {
  let component: ActiviteForWomensMenusComponent;
  let fixture: ComponentFixture<ActiviteForWomensMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteForWomensMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteForWomensMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
