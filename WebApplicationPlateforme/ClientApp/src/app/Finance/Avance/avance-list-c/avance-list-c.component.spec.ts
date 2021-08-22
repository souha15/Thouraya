import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceListCComponent } from './avance-list-c.component';

describe('AvanceListCComponent', () => {
  let component: AvanceListCComponent;
  let fixture: ComponentFixture<AvanceListCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceListCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceListCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
