import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFactureComponent } from './type-facture.component';

describe('TypeFactureComponent', () => {
  let component: TypeFactureComponent;
  let fixture: ComponentFixture<TypeFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
