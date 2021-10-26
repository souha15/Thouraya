import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRecrutementComponent } from './type-recrutement.component';

describe('TypeRecrutementComponent', () => {
  let component: TypeRecrutementComponent;
  let fixture: ComponentFixture<TypeRecrutementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRecrutementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
