import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinDetailsComponent } from './orphelin-details.component';

describe('OrphelinDetailsComponent', () => {
  let component: OrphelinDetailsComponent;
  let fixture: ComponentFixture<OrphelinDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphelinDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphelinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
