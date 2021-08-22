import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrancheTwoComponent } from './branche-two.component';

describe('BrancheTwoComponent', () => {
  let component: BrancheTwoComponent;
  let fixture: ComponentFixture<BrancheTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrancheTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrancheTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
