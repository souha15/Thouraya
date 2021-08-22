import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaintAddComponent } from './plaint-add.component';

describe('PlaintAddComponent', () => {
  let component: PlaintAddComponent;
  let fixture: ComponentFixture<PlaintAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaintAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaintAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
