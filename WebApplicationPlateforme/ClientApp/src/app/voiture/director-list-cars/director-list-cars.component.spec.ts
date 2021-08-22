import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorListCarsComponent } from './director-list-cars.component';

describe('DirectorListCarsComponent', () => {
  let component: DirectorListCarsComponent;
  let fixture: ComponentFixture<DirectorListCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorListCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorListCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
