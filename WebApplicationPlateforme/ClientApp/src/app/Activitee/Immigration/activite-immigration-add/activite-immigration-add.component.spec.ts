import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteImmigrationAddComponent } from './activite-immigration-add.component';

describe('ActiviteImmigrationAddComponent', () => {
  let component: ActiviteImmigrationAddComponent;
  let fixture: ComponentFixture<ActiviteImmigrationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteImmigrationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteImmigrationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
