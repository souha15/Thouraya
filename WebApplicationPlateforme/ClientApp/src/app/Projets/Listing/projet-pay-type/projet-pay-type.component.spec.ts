import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetPayTypeComponent } from './projet-pay-type.component';

describe('ProjetPayTypeComponent', () => {
  let component: ProjetPayTypeComponent;
  let fixture: ComponentFixture<ProjetPayTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetPayTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetPayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
