import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemDirMenuComponent } from './dem-dir-menu.component';

describe('DemDirMenuComponent', () => {
  let component: DemDirMenuComponent;
  let fixture: ComponentFixture<DemDirMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemDirMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemDirMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
