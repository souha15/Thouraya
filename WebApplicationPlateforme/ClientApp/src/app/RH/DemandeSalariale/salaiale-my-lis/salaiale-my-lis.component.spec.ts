import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaialeMyLisComponent } from './salaiale-my-lis.component';

describe('SalaialeMyLisComponent', () => {
  let component: SalaialeMyLisComponent;
  let fixture: ComponentFixture<SalaialeMyLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaialeMyLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaialeMyLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
