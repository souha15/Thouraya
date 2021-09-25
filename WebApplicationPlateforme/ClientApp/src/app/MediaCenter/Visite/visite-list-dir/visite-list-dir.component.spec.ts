import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteListDirComponent } from './visite-list-dir.component';

describe('VisiteListDirComponent', () => {
  let component: VisiteListDirComponent;
  let fixture: ComponentFixture<VisiteListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
