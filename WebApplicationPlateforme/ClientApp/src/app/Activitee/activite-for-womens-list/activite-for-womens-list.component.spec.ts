import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteForWomensListComponent } from './activite-for-womens-list.component';

describe('ActiviteForWomensListComponent', () => {
  let component: ActiviteForWomensListComponent;
  let fixture: ComponentFixture<ActiviteForWomensListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteForWomensListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteForWomensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
