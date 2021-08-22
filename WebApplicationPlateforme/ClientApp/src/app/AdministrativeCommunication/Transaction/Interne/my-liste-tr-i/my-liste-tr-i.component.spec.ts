import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListeTrIComponent } from './my-liste-tr-i.component';

describe('MyListeTrIComponent', () => {
  let component: MyListeTrIComponent;
  let fixture: ComponentFixture<MyListeTrIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListeTrIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListeTrIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
