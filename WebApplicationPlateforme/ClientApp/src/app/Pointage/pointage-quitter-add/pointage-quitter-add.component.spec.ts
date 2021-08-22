import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageQuitterAddComponent } from './pointage-quitter-add.component';

describe('PointageQuitterAddComponent', () => {
  let component: PointageQuitterAddComponent;
  let fixture: ComponentFixture<PointageQuitterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointageQuitterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageQuitterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
