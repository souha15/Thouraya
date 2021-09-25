import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExthechniqueListDirComponent } from './exthechnique-list-dir.component';

describe('ExthechniqueListDirComponent', () => {
  let component: ExthechniqueListDirComponent;
  let fixture: ComponentFixture<ExthechniqueListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExthechniqueListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExthechniqueListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
