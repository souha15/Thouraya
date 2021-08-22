import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenusListComponent } from './revenus-list.component';

describe('RevenusListComponent', () => {
  let component: RevenusListComponent;
  let fixture: ComponentFixture<RevenusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
