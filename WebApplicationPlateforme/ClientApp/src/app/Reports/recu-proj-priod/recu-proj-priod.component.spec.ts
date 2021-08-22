import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuProjPriodComponent } from './recu-proj-priod.component';

describe('RecuProjPriodComponent', () => {
  let component: RecuProjPriodComponent;
  let fixture: ComponentFixture<RecuProjPriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuProjPriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuProjPriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
