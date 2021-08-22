import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListRecrutmentComponent } from './my-list-recrutment.component';

describe('MyListRecrutmentComponent', () => {
  let component: MyListRecrutmentComponent;
  let fixture: ComponentFixture<MyListRecrutmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListRecrutmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListRecrutmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
