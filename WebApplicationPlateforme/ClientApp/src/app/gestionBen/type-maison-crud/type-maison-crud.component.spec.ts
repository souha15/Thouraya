import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMaisonCrudComponent } from './type-maison-crud.component';

describe('TypeMaisonCrudComponent', () => {
  let component: TypeMaisonCrudComponent;
  let fixture: ComponentFixture<TypeMaisonCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMaisonCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMaisonCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
