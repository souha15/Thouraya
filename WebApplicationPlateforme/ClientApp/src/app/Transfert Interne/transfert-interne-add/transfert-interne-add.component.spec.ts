import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertInterneAddComponent } from './transfert-interne-add.component';

describe('TransfertInterneAddComponent', () => {
  let component: TransfertInterneAddComponent;
  let fixture: ComponentFixture<TransfertInterneAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertInterneAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertInterneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
