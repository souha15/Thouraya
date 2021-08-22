import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenDetailComponent } from './gest-ben-detail.component';

describe('GestBenDetailComponent', () => {
  let component: GestBenDetailComponent;
  let fixture: ComponentFixture<GestBenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
