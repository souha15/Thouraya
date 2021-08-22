import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhRecrutmentListComponent } from './rh-recrutment-list.component';

describe('RhRecrutmentListComponent', () => {
  let component: RhRecrutmentListComponent;
  let fixture: ComponentFixture<RhRecrutmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhRecrutmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhRecrutmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
