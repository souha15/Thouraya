import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttetionAddComponent } from './attetion-add.component';

describe('AttetionAddComponent', () => {
  let component: AttetionAddComponent;
  let fixture: ComponentFixture<AttetionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttetionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttetionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
