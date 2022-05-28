import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoDotationMenusComponent } from './histo-dotation-menus.component';

describe('HistoDotationMenusComponent', () => {
  let component: HistoDotationMenusComponent;
  let fixture: ComponentFixture<HistoDotationMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoDotationMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoDotationMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
