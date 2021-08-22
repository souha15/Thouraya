import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDotationComponent } from './liste-dotation.component';

describe('ListeDotationComponent', () => {
  let component: ListeDotationComponent;
  let fixture: ComponentFixture<ListeDotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
