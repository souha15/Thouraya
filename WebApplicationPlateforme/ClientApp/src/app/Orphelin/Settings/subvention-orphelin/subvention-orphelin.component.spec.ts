import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubventionOrphelinComponent } from './subvention-orphelin.component';

describe('SubventionOrphelinComponent', () => {
  let component: SubventionOrphelinComponent;
  let fixture: ComponentFixture<SubventionOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubventionOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubventionOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
