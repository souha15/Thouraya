import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatieresOrphelinComponent } from './matieres-orphelin.component';

describe('MatieresOrphelinComponent', () => {
  let component: MatieresOrphelinComponent;
  let fixture: ComponentFixture<MatieresOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatieresOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatieresOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
