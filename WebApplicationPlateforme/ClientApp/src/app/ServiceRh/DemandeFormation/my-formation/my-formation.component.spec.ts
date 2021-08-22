import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormationComponent } from './my-formation.component';

describe('MyFormationComponent', () => {
  let component: MyFormationComponent;
  let fixture: ComponentFixture<MyFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
