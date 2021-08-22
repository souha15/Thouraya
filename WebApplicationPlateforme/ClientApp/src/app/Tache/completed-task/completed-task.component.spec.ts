import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTaskComponent } from './completed-task.component';

describe('CompletedTaskComponent', () => {
  let component: CompletedTaskComponent;
  let fixture: ComponentFixture<CompletedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
