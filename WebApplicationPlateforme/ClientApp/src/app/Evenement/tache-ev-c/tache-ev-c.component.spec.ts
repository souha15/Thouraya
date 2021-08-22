import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheEvCComponent } from './tache-ev-c.component';

describe('TacheEvCComponent', () => {
  let component: TacheEvCComponent;
  let fixture: ComponentFixture<TacheEvCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheEvCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheEvCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
