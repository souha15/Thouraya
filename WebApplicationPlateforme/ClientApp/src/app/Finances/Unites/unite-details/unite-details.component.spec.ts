import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteDetailsComponent } from './unite-details.component';

describe('UniteDetailsComponent', () => {
  let component: UniteDetailsComponent;
  let fixture: ComponentFixture<UniteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
