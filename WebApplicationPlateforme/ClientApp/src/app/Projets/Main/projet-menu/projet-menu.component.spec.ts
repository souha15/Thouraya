import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetMenuComponent } from './projet-menu.component';

describe('ProjetMenuComponent', () => {
  let component: ProjetMenuComponent;
  let fixture: ComponentFixture<ProjetMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
