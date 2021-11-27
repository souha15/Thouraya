import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttetionLisComponent } from './attetion-lis.component';

describe('AttetionLisComponent', () => {
  let component: AttetionLisComponent;
  let fixture: ComponentFixture<AttetionLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttetionLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttetionLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
