import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTuteurComponent } from './list-tuteur.component';

describe('ListTuteurComponent', () => {
  let component: ListTuteurComponent;
  let fixture: ComponentFixture<ListTuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
