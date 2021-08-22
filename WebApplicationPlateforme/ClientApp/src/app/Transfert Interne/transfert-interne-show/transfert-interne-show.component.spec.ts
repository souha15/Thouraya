import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertInterneShowComponent } from './transfert-interne-show.component';

describe('TransfertInterneShowComponent', () => {
  let component: TransfertInterneShowComponent;
  let fixture: ComponentFixture<TransfertInterneShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertInterneShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertInterneShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
