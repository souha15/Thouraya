import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestBenListDirComponent } from './gest-ben-list-dir.component';

describe('GestBenListDirComponent', () => {
  let component: GestBenListDirComponent;
  let fixture: ComponentFixture<GestBenListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestBenListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestBenListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
