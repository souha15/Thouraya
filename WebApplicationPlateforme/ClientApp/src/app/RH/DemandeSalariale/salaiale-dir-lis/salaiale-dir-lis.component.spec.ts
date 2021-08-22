import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaialeDirLisComponent } from './salaiale-dir-lis.component';

describe('SalaialeDirLisComponent', () => {
  let component: SalaialeDirLisComponent;
  let fixture: ComponentFixture<SalaialeDirLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaialeDirLisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaialeDirLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
