import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStockageComponent } from './home-stockage.component';

describe('HomeStockageComponent', () => {
  let component: HomeStockageComponent;
  let fixture: ComponentFixture<HomeStockageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStockageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
