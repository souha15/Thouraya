import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeForgeronComponent } from './dem-conge-forgeron.component';

describe('DemCongeForgeronComponent', () => {
  let component: DemCongeForgeronComponent;
  let fixture: ComponentFixture<DemCongeForgeronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeForgeronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeForgeronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
