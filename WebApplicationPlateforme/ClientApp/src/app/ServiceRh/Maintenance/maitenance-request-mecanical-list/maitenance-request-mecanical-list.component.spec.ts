import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaitenanceRequestMecanicalListComponent } from './maitenance-request-mecanical-list.component';

describe('MaitenanceRequestMecanicalListComponent', () => {
  let component: MaitenanceRequestMecanicalListComponent;
  let fixture: ComponentFixture<MaitenanceRequestMecanicalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaitenanceRequestMecanicalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaitenanceRequestMecanicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
