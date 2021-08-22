import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseCComponent } from './depense-c.component';

describe('DepenseCComponent', () => {
  let component: DepenseCComponent;
  let fixture: ComponentFixture<DepenseCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepenseCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
