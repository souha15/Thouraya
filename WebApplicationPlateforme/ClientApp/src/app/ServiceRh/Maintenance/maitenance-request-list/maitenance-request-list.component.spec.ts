import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaitenanceRequestListComponent } from './maitenance-request-list.component';

describe('MaitenanceRequestListComponent', () => {
  let component: MaitenanceRequestListComponent;
  let fixture: ComponentFixture<MaitenanceRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaitenanceRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaitenanceRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
