import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivAddComponent } from './priv-add.component';

describe('PrivAddComponent', () => {
  let component: PrivAddComponent;
  let fixture: ComponentFixture<PrivAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
