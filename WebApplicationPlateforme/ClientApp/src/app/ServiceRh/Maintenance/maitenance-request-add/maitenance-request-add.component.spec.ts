import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaitenanceRequestAddComponent } from './maitenance-request-add.component';

describe('MaitenanceRequestAddComponent', () => {
  let component: MaitenanceRequestAddComponent;
  let fixture: ComponentFixture<MaitenanceRequestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaitenanceRequestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaitenanceRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
