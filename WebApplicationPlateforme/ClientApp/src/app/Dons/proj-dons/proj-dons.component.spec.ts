import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjDonsComponent } from './proj-dons.component';

describe('ProjDonsComponent', () => {
  let component: ProjDonsComponent;
  let fixture: ComponentFixture<ProjDonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjDonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjDonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
