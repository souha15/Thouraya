import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinListComponent } from './orphelin-list.component';

describe('OrphelinListComponent', () => {
  let component: OrphelinListComponent;
  let fixture: ComponentFixture<OrphelinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphelinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphelinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
