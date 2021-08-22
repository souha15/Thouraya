import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenEditComponent } from './gest-ben-edit.component';

describe('GestBenEditComponent', () => {
  let component: GestBenEditComponent;
  let fixture: ComponentFixture<GestBenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
