import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdministrationComponent } from './new-administration.component';

describe('NewAdministrationComponent', () => {
  let component: NewAdministrationComponent;
  let fixture: ComponentFixture<NewAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
