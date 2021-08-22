import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListeTrEmiseComponent } from './my-liste-tr-emise.component';

describe('MyListeTrEmiseComponent', () => {
  let component: MyListeTrEmiseComponent;
  let fixture: ComponentFixture<MyListeTrEmiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListeTrEmiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListeTrEmiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
