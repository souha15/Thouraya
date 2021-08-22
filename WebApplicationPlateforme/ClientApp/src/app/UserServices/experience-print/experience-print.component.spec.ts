import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePrintComponent } from './experience-print.component';

describe('ExperiencePrintComponent', () => {
  let component: ExperiencePrintComponent;
  let fixture: ComponentFixture<ExperiencePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
