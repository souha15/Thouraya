import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemTechListDirrComponent } from './dem-tech-list-dirr.component';

describe('DemTechListDirrComponent', () => {
  let component: DemTechListDirrComponent;
  let fixture: ComponentFixture<DemTechListDirrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemTechListDirrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemTechListDirrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
