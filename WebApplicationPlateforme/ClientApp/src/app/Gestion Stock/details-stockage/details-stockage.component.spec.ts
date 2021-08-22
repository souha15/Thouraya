import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStockageComponent } from './details-stockage.component';

describe('DetailsStockageComponent', () => {
  let component: DetailsStockageComponent;
  let fixture: ComponentFixture<DetailsStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
