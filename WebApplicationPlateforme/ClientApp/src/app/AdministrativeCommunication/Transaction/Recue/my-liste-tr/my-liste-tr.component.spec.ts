import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListeTrComponent } from './my-liste-tr.component';

describe('MyListeTrComponent', () => {
  let component: MyListeTrComponent;
  let fixture: ComponentFixture<MyListeTrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListeTrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListeTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
