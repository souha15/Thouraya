import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTuteurComponent } from './details-tuteur.component';

describe('DetailsTuteurComponent', () => {
  let component: DetailsTuteurComponent;
  let fixture: ComponentFixture<DetailsTuteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTuteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
