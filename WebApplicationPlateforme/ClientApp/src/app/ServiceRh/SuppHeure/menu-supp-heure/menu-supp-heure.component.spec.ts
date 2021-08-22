import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSuppHeureComponent } from './menu-supp-heure.component';

describe('MenuSuppHeureComponent', () => {
  let component: MenuSuppHeureComponent;
  let fixture: ComponentFixture<MenuSuppHeureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSuppHeureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSuppHeureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
