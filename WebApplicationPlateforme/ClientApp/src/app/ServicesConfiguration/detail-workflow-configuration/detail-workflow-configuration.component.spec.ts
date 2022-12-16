import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWorkflowConfigurationComponent } from './detail-workflow-configuration.component';

describe('DetailWorkflowConfigurationComponent', () => {
  let component: DetailWorkflowConfigurationComponent;
  let fixture: ComponentFixture<DetailWorkflowConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWorkflowConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWorkflowConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
