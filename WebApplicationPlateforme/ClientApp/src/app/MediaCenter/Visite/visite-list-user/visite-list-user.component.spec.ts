import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteListUserComponent } from './visite-list-user.component';

describe('VisiteListUserComponent', () => {
  let component: VisiteListUserComponent;
  let fixture: ComponentFixture<VisiteListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
