import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivieCongeComponent } from './suivie-conge.component';

describe('SuivieCongeComponent', () => {
  let component: SuivieCongeComponent;
  let fixture: ComponentFixture<SuivieCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuivieCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivieCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
