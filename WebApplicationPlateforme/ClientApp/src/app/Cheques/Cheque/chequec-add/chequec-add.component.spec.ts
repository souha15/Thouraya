import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequecAddComponent } from './chequec-add.component';

describe('ChequecAddComponent', () => {
  let component: ChequecAddComponent;
  let fixture: ComponentFixture<ChequecAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequecAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequecAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
