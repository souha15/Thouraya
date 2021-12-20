import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteTypePrepaComponent } from './activite-type-prepa.component';

describe('ActiviteTypePrepaComponent', () => {
  let component: ActiviteTypePrepaComponent;
  let fixture: ComponentFixture<ActiviteTypePrepaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteTypePrepaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteTypePrepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
