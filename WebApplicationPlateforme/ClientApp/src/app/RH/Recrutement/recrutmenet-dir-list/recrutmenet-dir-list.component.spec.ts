import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutmenetDirListComponent } from './recrutmenet-dir-list.component';

describe('RecrutmenetDirListComponent', () => {
  let component: RecrutmenetDirListComponent;
  let fixture: ComponentFixture<RecrutmenetDirListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecrutmenetDirListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutmenetDirListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
