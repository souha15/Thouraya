import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkflowConfigurationComponent } from './edit-workflow-configuration.component';

describe('EditWorkflowConfigurationComponent', () => {
  let component: EditWorkflowConfigurationComponent;
  let fixture: ComponentFixture<EditWorkflowConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkflowConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkflowConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
