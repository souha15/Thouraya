import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetClientComponent } from './add-projet-client.component';

describe('AddProjetClientComponent', () => {
  let component: AddProjetClientComponent;
  let fixture: ComponentFixture<AddProjetClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjetClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjetClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
