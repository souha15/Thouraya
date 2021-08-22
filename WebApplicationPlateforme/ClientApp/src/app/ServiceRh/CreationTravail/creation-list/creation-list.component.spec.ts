import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationListComponent } from './creation-list.component';

describe('CreationListComponent', () => {
  let component: CreationListComponent;
  let fixture: ComponentFixture<CreationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
