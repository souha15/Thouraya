import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemissionEditComponent } from './demission-edit.component';

describe('DemissionEditComponent', () => {
  let component: DemissionEditComponent;
  let fixture: ComponentFixture<DemissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
