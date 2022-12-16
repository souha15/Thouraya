import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkflowServicesComponent } from './list-workflow-services.component';

describe('ListWorkflowServicesComponent', () => {
  let component: ListWorkflowServicesComponent;
  let fixture: ComponentFixture<ListWorkflowServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWorkflowServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkflowServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
