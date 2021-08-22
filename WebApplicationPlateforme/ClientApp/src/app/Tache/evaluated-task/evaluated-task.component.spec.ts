import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedTaskComponent } from './evaluated-task.component';

describe('EvaluatedTaskComponent', () => {
  let component: EvaluatedTaskComponent;
  let fixture: ComponentFixture<EvaluatedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
