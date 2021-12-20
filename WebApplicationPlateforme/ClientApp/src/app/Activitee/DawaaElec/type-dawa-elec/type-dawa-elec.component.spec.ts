import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDawaElecComponent } from './type-dawa-elec.component';

describe('TypeDawaElecComponent', () => {
  let component: TypeDawaElecComponent;
  let fixture: ComponentFixture<TypeDawaElecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDawaElecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDawaElecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
