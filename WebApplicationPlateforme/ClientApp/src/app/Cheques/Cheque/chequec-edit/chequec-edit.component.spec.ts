import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequecEditComponent } from './chequec-edit.component';

describe('ChequecEditComponent', () => {
  let component: ChequecEditComponent;
  let fixture: ComponentFixture<ChequecEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequecEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequecEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
