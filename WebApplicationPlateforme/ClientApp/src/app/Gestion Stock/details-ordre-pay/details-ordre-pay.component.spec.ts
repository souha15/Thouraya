import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrdrePayComponent } from './details-ordre-pay.component';

describe('DetailsOrdrePayComponent', () => {
  let component: DetailsOrdrePayComponent;
  let fixture: ComponentFixture<DetailsOrdrePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrdrePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrdrePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
