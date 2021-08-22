import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormationRequestListComponent } from './new-formation-request-list.component';

describe('NewFormationRequestListComponent', () => {
  let component: NewFormationRequestListComponent;
  let fixture: ComponentFixture<NewFormationRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFormationRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
