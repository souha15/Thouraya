import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDroitCrudComponent } from './type-droit-crud.component';

describe('TypeDroitCrudComponent', () => {
  let component: TypeDroitCrudComponent;
  let fixture: ComponentFixture<TypeDroitCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDroitCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDroitCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
