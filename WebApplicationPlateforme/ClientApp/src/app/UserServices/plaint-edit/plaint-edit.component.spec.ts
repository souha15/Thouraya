import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaintEditComponent } from './plaint-edit.component';

describe('PlaintEditComponent', () => {
  let component: PlaintEditComponent;
  let fixture: ComponentFixture<PlaintEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaintEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaintEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
