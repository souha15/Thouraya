import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceListDirComponent } from './residence-list-dir.component';

describe('ResidenceListDirComponent', () => {
  let component: ResidenceListDirComponent;
  let fixture: ComponentFixture<ResidenceListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenceListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenceListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
