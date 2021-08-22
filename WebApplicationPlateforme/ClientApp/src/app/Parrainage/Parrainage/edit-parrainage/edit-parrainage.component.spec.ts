import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParrainageComponent } from './edit-parrainage.component';

describe('EditParrainageComponent', () => {
  let component: EditParrainageComponent;
  let fixture: ComponentFixture<EditParrainageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParrainageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParrainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
