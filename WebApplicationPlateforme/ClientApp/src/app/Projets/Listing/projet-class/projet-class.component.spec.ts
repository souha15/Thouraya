import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetClassComponent } from './projet-class.component';

describe('ProjetClassComponent', () => {
  let component: ProjetClassComponent;
  let fixture: ComponentFixture<ProjetClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
