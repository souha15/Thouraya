import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemTechEditComponent } from './dem-tech-edit.component';

describe('DemTechEditComponent', () => {
  let component: DemTechEditComponent;
  let fixture: ComponentFixture<DemTechEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemTechEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemTechEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
