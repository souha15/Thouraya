import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequecDetailsComponent } from './chequec-details.component';

describe('ChequecDetailsComponent', () => {
  let component: ChequecDetailsComponent;
  let fixture: ComponentFixture<ChequecDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequecDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequecDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
