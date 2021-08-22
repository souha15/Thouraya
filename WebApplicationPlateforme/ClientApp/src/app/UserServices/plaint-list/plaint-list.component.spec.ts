import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaintListComponent } from './plaint-list.component';

describe('PlaintListComponent', () => {
  let component: PlaintListComponent;
  let fixture: ComponentFixture<PlaintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
