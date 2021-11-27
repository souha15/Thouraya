import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuStockageServiceComponent } from './home-menu-stockage-service.component';

describe('HomeMenuStockageServiceComponent', () => {
  let component: HomeMenuStockageServiceComponent;
  let fixture: ComponentFixture<HomeMenuStockageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMenuStockageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMenuStockageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
