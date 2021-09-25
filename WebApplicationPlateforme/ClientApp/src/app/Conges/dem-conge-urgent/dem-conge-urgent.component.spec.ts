import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeUrgentComponent } from './dem-conge-urgent.component';

describe('DemCongeUrgentComponent', () => {
  let component: DemCongeUrgentComponent;
  let fixture: ComponentFixture<DemCongeUrgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeUrgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeUrgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
