import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuNbPeriodComponent } from './recu-nb-period.component';

describe('RecuNbPeriodComponent', () => {
  let component: RecuNbPeriodComponent;
  let fixture: ComponentFixture<RecuNbPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuNbPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuNbPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
