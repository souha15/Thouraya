import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeNormalComponent } from './dem-conge-normal.component';

describe('DemCongeNormalComponent', () => {
  let component: DemCongeNormalComponent;
  let fixture: ComponentFixture<DemCongeNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
