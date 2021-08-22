import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormationRequestAddComponent } from './new-formation-request-add.component';

describe('NewFormationRequestAddComponent', () => {
  let component: NewFormationRequestAddComponent;
  let fixture: ComponentFixture<NewFormationRequestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFormationRequestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormationRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
