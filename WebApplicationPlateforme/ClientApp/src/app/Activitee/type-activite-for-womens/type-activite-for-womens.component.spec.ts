import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActiviteForWomensComponent } from './type-activite-for-womens.component';

describe('TypeActiviteForWomensComponent', () => {
  let component: TypeActiviteForWomensComponent;
  let fixture: ComponentFixture<TypeActiviteForWomensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeActiviteForWomensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActiviteForWomensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
