import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExthechniqueAddComponent } from './exthechnique-add.component';

describe('ExthechniqueAddComponent', () => {
  let component: ExthechniqueAddComponent;
  let fixture: ComponentFixture<ExthechniqueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExthechniqueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExthechniqueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
