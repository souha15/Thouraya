import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParrainageComponent } from './details-parrainage.component';

describe('DetailsParrainageComponent', () => {
  let component: DetailsParrainageComponent;
  let fixture: ComponentFixture<DetailsParrainageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsParrainageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsParrainageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
