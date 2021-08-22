import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuEmpDateComponent } from './recu-emp-date.component';

describe('RecuEmpDateComponent', () => {
  let component: RecuEmpDateComponent;
  let fixture: ComponentFixture<RecuEmpDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuEmpDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuEmpDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
