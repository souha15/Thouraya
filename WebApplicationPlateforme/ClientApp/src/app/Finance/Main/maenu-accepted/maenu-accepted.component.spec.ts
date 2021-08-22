import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaenuAcceptedComponent } from './maenu-accepted.component';

describe('MaenuAcceptedComponent', () => {
  let component: MaenuAcceptedComponent;
  let fixture: ComponentFixture<MaenuAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaenuAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaenuAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
