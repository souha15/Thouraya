import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceListDComponent } from './avance-list-d.component';

describe('AvanceListDComponent', () => {
  let component: AvanceListDComponent;
  let fixture: ComponentFixture<AvanceListDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceListDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceListDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
