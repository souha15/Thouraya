import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfftectedToMyAdminRComponent } from './afftected-to-my-admin-r.component';

describe('AfftectedToMyAdminRComponent', () => {
  let component: AfftectedToMyAdminRComponent;
  let fixture: ComponentFixture<AfftectedToMyAdminRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfftectedToMyAdminRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfftectedToMyAdminRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
