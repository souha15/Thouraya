import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheOneComponent } from './branche-one.component';

describe('BrancheOneComponent', () => {
  let component: BrancheOneComponent;
  let fixture: ComponentFixture<BrancheOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrancheOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrancheOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
