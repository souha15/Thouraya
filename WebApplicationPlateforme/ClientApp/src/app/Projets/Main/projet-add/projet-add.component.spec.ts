import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetAddComponent } from './projet-add.component';

describe('ProjetAddComponent', () => {
  let component: ProjetAddComponent;
  let fixture: ComponentFixture<ProjetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
