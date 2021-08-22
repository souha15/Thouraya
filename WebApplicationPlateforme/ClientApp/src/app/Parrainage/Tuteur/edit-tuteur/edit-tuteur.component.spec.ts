import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTuteurComponent } from './edit-tuteur.component';

describe('EditTuteurComponent', () => {
  let component: EditTuteurComponent;
  let fixture: ComponentFixture<EditTuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
