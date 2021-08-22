import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaintListdirComponent } from './plaint-listdir.component';

describe('PlaintListdirComponent', () => {
  let component: PlaintListdirComponent;
  let fixture: ComponentFixture<PlaintListdirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaintListdirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaintListdirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
