import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMusulmanComponent } from './edit-musulman.component';

describe('EditMusulmanComponent', () => {
  let component: EditMusulmanComponent;
  let fixture: ComponentFixture<EditMusulmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMusulmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMusulmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
