import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendonneListDirComponent } from './rendonne-list-dir.component';

describe('RendonneListDirComponent', () => {
  let component: RendonneListDirComponent;
  let fixture: ComponentFixture<RendonneListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendonneListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendonneListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
