import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendonneListUserComponent } from './rendonne-list-user.component';

describe('RendonneListUserComponent', () => {
  let component: RendonneListUserComponent;
  let fixture: ComponentFixture<RendonneListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendonneListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendonneListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
