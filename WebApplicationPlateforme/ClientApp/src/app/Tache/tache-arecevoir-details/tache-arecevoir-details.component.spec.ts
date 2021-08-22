import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheARecevoirDetailsComponent } from './tache-arecevoir-details.component';

describe('TacheARecevoirDetailsComponent', () => {
  let component: TacheARecevoirDetailsComponent;
  let fixture: ComponentFixture<TacheARecevoirDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheARecevoirDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheARecevoirDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
