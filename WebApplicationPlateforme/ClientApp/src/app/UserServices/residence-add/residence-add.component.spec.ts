import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceAddComponent } from './residence-add.component';

describe('ResidenceAddComponent', () => {
  let component: ResidenceAddComponent;
  let fixture: ComponentFixture<ResidenceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
