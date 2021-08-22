import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPayDirecteComponent } from './details-pay-directe.component';

describe('DetailsPayDirecteComponent', () => {
  let component: DetailsPayDirecteComponent;
  let fixture: ComponentFixture<DetailsPayDirecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPayDirecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPayDirecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
