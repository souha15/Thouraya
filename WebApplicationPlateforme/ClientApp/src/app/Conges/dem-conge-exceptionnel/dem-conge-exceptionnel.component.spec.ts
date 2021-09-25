import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemCongeExceptionnelComponent } from './dem-conge-exceptionnel.component';

describe('DemCongeExceptionnelComponent', () => {
  let component: DemCongeExceptionnelComponent;
  let fixture: ComponentFixture<DemCongeExceptionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemCongeExceptionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemCongeExceptionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
