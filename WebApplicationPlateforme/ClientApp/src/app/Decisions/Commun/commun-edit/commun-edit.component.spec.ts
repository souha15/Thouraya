import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunEditComponent } from './commun-edit.component';

describe('CommunEditComponent', () => {
  let component: CommunEditComponent;
  let fixture: ComponentFixture<CommunEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
