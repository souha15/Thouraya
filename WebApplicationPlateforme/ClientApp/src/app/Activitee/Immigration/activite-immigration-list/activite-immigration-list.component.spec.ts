import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteImmigrationListComponent } from './activite-immigration-list.component';

describe('ActiviteImmigrationListComponent', () => {
  let component: ActiviteImmigrationListComponent;
  let fixture: ComponentFixture<ActiviteImmigrationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteImmigrationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteImmigrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
