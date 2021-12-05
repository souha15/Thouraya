import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemTechDetailsComponent } from './dem-tech-details.component';

describe('DemTechDetailsComponent', () => {
  let component: DemTechDetailsComponent;
  let fixture: ComponentFixture<DemTechDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemTechDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemTechDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
