import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemissionAddComponent } from './demission-add.component';

describe('DemissionAddComponent', () => {
  let component: DemissionAddComponent;
  let fixture: ComponentFixture<DemissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
