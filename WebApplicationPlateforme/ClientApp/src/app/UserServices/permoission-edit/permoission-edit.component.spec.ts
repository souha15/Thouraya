import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermoissionEditComponent } from './permoission-edit.component';

describe('PermoissionEditComponent', () => {
  let component: PermoissionEditComponent;
  let fixture: ComponentFixture<PermoissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermoissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermoissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
