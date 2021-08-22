import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRevenusComponent } from './edit-revenus.component';

describe('EditRevenusComponent', () => {
  let component: EditRevenusComponent;
  let fixture: ComponentFixture<EditRevenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRevenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRevenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
