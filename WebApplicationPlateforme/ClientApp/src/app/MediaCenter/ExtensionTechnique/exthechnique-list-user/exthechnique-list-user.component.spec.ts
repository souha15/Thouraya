import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExthechniqueListUserComponent } from './exthechnique-list-user.component';

describe('ExthechniqueListUserComponent', () => {
  let component: ExthechniqueListUserComponent;
  let fixture: ComponentFixture<ExthechniqueListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExthechniqueListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExthechniqueListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
