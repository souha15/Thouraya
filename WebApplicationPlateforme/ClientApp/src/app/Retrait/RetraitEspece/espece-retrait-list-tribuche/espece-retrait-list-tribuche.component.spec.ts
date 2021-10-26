import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeceRetraitListTribucheComponent } from './espece-retrait-list-tribuche.component';

describe('EspeceRetraitListTribucheComponent', () => {
  let component: EspeceRetraitListTribucheComponent;
  let fixture: ComponentFixture<EspeceRetraitListTribucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeceRetraitListTribucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeceRetraitListTribucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
