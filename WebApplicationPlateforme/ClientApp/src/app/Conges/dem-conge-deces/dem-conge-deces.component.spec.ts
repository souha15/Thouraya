import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeDecesComponent } from './dem-conge-deces.component';

describe('DemCongeDecesComponent', () => {
  let component: DemCongeDecesComponent;
  let fixture: ComponentFixture<DemCongeDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
