import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertInterneListComponent } from './transfert-interne-list.component';

describe('TransfertInterneListComponent', () => {
  let component: TransfertInterneListComponent;
  let fixture: ComponentFixture<TransfertInterneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertInterneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertInterneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
