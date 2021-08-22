import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfftectedToMyAdminEComponent } from './afftected-to-my-admin-e.component';

describe('AfftectedToMyAdminEComponent', () => {
  let component: AfftectedToMyAdminEComponent;
  let fixture: ComponentFixture<AfftectedToMyAdminEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfftectedToMyAdminEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfftectedToMyAdminEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
