import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDemandsComponent } from './all-demands.component';

describe('AllDemandsComponent', () => {
  let component: AllDemandsComponent;
  let fixture: ComponentFixture<AllDemandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDemandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
