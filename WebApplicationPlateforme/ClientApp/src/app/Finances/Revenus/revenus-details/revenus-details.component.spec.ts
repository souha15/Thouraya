import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusDetailsComponent } from './revenus-details.component';

describe('RevenusDetailsComponent', () => {
  let component: RevenusDetailsComponent;
  let fixture: ComponentFixture<RevenusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
