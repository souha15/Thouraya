import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivListDirComponent } from './priv-list-dir.component';

describe('PrivListDirComponent', () => {
  let component: PrivListDirComponent;
  let fixture: ComponentFixture<PrivListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
