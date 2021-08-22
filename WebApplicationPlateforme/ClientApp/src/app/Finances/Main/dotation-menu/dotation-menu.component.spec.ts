import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationMenuComponent } from './dotation-menu.component';

describe('DotationMenuComponent', () => {
  let component: DotationMenuComponent;
  let fixture: ComponentFixture<DotationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
