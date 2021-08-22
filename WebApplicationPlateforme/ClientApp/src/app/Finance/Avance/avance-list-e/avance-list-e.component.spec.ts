import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceListEComponent } from './avance-list-e.component';

describe('AvanceListEComponent', () => {
  let component: AvanceListEComponent;
  let fixture: ComponentFixture<AvanceListEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceListEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceListEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
