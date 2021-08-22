import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuProjDateComponent } from './recu-proj-date.component';

describe('RecuProjDateComponent', () => {
  let component: RecuProjDateComponent;
  let fixture: ComponentFixture<RecuProjDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuProjDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuProjDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
