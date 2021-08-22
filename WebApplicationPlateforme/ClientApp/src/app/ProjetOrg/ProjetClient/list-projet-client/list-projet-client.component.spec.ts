import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetClientComponent } from './list-projet-client.component';

describe('ListProjetClientComponent', () => {
  let component: ListProjetClientComponent;
  let fixture: ComponentFixture<ListProjetClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
