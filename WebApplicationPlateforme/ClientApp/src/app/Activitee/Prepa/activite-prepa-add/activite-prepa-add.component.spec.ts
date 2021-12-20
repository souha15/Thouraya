import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitePrepaAddComponent } from './activite-prepa-add.component';

describe('ActivitePrepaAddComponent', () => {
  let component: ActivitePrepaAddComponent;
  let fixture: ComponentFixture<ActivitePrepaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitePrepaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitePrepaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
