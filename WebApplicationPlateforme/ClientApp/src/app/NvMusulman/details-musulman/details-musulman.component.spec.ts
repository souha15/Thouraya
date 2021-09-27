import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMusulmanComponent } from './details-musulman.component';

describe('DetailsMusulmanComponent', () => {
  let component: DetailsMusulmanComponent;
  let fixture: ComponentFixture<DetailsMusulmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMusulmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMusulmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
