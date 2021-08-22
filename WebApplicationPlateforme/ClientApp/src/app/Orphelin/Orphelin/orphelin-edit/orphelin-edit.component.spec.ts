import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinEditComponent } from './orphelin-edit.component';

describe('OrphelinEditComponent', () => {
  let component: OrphelinEditComponent;
  let fixture: ComponentFixture<OrphelinEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphelinEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphelinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
