import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeHajComponent } from './dem-conge-haj.component';

describe('DemCongeHajComponent', () => {
  let component: DemCongeHajComponent;
  let fixture: ComponentFixture<DemCongeHajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeHajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeHajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
