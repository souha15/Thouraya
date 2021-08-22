import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGestBenMenuComponent } from './crud-gest-ben-menu.component';

describe('CrudGestBenMenuComponent', () => {
  let component: CrudGestBenMenuComponent;
  let fixture: ComponentFixture<CrudGestBenMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudGestBenMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGestBenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
