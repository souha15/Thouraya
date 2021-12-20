import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitePrepaListComponent } from './activite-prepa-list.component';

describe('ActivitePrepaListComponent', () => {
  let component: ActivitePrepaListComponent;
  let fixture: ComponentFixture<ActivitePrepaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitePrepaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitePrepaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
