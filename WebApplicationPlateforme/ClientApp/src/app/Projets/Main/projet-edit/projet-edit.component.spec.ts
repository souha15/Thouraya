import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetEditComponent } from './projet-edit.component';

describe('ProjetEditComponent', () => {
  let component: ProjetEditComponent;
  let fixture: ComponentFixture<ProjetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
