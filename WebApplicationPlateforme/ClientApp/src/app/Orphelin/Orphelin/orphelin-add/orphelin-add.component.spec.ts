import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinAddComponent } from './orphelin-add.component';

describe('OrphelinAddComponent', () => {
  let component: OrphelinAddComponent;
  let fixture: ComponentFixture<OrphelinAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphelinAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphelinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
