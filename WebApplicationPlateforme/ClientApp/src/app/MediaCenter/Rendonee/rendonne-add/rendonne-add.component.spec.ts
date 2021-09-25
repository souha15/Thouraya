import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendonneAddComponent } from './rendonne-add.component';

describe('RendonneAddComponent', () => {
  let component: RendonneAddComponent;
  let fixture: ComponentFixture<RendonneAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendonneAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendonneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
