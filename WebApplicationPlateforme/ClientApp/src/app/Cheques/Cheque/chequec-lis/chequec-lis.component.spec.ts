import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequecLisComponent } from './chequec-lis.component';

describe('ChequecLisComponent', () => {
  let component: ChequecLisComponent;
  let fixture: ComponentFixture<ChequecLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequecLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequecLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
