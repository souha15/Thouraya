import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmeListComponent } from './alarme-list.component';

describe('AlarmeListComponent', () => {
  let component: AlarmeListComponent;
  let fixture: ComponentFixture<AlarmeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
