import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotRevenusComponent } from './depot-revenus.component';

describe('DepotRevenusComponent', () => {
  let component: DepotRevenusComponent;
  let fixture: ComponentFixture<DepotRevenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepotRevenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotRevenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
