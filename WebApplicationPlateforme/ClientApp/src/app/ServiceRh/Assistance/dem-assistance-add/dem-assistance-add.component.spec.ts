import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemAssistanceAddComponent } from './dem-assistance-add.component';

describe('DemAssistanceAddComponent', () => {
  let component: DemAssistanceAddComponent;
  let fixture: ComponentFixture<DemAssistanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemAssistanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemAssistanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
