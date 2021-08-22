import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListCongeComponent } from './my-list-conge.component';

describe('MyListCongeComponent', () => {
  let component: MyListCongeComponent;
  let fixture: ComponentFixture<MyListCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
