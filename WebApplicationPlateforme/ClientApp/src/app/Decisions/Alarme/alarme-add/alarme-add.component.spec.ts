import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmeAddComponent } from './alarme-add.component';

describe('AlarmeAddComponent', () => {
  let component: AlarmeAddComponent;
  let fixture: ComponentFixture<AlarmeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
