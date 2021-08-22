import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeOrphelinComponent } from './organisme-orphelin.component';

describe('OrganismeOrphelinComponent', () => {
  let component: OrganismeOrphelinComponent;
  let fixture: ComponentFixture<OrganismeOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismeOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismeOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
