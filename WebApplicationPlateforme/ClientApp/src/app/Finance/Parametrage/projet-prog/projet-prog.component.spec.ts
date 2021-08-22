import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetProgComponent } from './projet-prog.component';

describe('ProjetProgComponent', () => {
  let component: ProjetProgComponent;
  let fixture: ComponentFixture<ProjetProgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetProgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
