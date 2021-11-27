import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisifListDirComponent } from './decisif-list-dir.component';

describe('DecisifListDirComponent', () => {
  let component: DecisifListDirComponent;
  let fixture: ComponentFixture<DecisifListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisifListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisifListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
