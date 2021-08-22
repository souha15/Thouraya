import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLocataireComponent } from './liste-locataire.component';

describe('ListeLocataireComponent', () => {
  let component: ListeLocataireComponent;
  let fixture: ComponentFixture<ListeLocataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLocataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
