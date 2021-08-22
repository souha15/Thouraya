import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSoldeComponent } from './details-solde.component';

describe('DetailsSoldeComponent', () => {
  let component: DetailsSoldeComponent;
  let fixture: ComponentFixture<DetailsSoldeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSoldeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
