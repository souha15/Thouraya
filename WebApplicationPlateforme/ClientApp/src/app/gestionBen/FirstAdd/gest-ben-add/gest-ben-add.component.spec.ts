import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenAddComponent } from './gest-ben-add.component';

describe('GestBenAddComponent', () => {
  let component: GestBenAddComponent;
  let fixture: ComponentFixture<GestBenAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
