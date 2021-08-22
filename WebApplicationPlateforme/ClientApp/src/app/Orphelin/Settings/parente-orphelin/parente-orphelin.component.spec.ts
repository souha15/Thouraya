import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenteOrphelinComponent } from './parente-orphelin.component';

describe('ParenteOrphelinComponent', () => {
  let component: ParenteOrphelinComponent;
  let fixture: ComponentFixture<ParenteOrphelinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParenteOrphelinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenteOrphelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
