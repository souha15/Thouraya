import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPrivListComponent } from './my-priv-list.component';

describe('MyPrivListComponent', () => {
  let component: MyPrivListComponent;
  let fixture: ComponentFixture<MyPrivListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPrivListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPrivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
