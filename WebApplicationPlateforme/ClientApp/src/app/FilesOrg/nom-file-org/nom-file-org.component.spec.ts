import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomFileOrgComponent } from './nom-file-org.component';

describe('NomFileOrgComponent', () => {
  let component: NomFileOrgComponent;
  let fixture: ComponentFixture<NomFileOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomFileOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomFileOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
