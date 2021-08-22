import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseCComponent } from './classe-c.component';

describe('ClasseCComponent', () => {
  let component: ClasseCComponent;
  let fixture: ComponentFixture<ClasseCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
