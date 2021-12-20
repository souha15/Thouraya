import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationMenuComponent } from './immigration-menu.component';

describe('ImmigrationMenuComponent', () => {
  let component: ImmigrationMenuComponent;
  let fixture: ComponentFixture<ImmigrationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
