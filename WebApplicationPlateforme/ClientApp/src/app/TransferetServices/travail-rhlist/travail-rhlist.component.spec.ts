import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravailRHListComponent } from './travail-rhlist.component';

describe('TravailRHListComponent', () => {
  let component: TravailRHListComponent;
  let fixture: ComponentFixture<TravailRHListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravailRHListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravailRHListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
