import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilsCComponent } from './outils-c.component';

describe('OutilsCComponent', () => {
  let component: OutilsCComponent;
  let fixture: ComponentFixture<OutilsCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutilsCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutilsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
