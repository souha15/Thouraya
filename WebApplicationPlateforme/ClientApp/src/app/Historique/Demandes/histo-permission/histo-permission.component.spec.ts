import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoPermissionComponent } from './histo-permission.component';

describe('HistoPermissionComponent', () => {
  let component: HistoPermissionComponent;
  let fixture: ComponentFixture<HistoPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
