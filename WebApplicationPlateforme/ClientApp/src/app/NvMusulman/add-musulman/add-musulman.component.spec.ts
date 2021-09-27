import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusulmanComponent } from './add-musulman.component';

describe('AddMusulmanComponent', () => {
  let component: AddMusulmanComponent;
  let fixture: ComponentFixture<AddMusulmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMusulmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMusulmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
