import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkflowConfigurationComponent } from './add-workflow-configuration.component';

describe('AddWorkflowConfigurationComponent', () => {
  let component: AddWorkflowConfigurationComponent;
  let fixture: ComponentFixture<AddWorkflowConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkflowConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkflowConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
