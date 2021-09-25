import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteEditComponent } from './visite-edit.component';

describe('VisiteEditComponent', () => {
  let component: VisiteEditComponent;
  let fixture: ComponentFixture<VisiteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
