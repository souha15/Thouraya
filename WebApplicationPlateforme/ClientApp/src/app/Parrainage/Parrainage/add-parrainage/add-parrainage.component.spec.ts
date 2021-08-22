import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParrainageComponent } from './add-parrainage.component';

describe('AddParrainageComponent', () => {
  let component: AddParrainageComponent;
  let fixture: ComponentFixture<AddParrainageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParrainageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParrainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
