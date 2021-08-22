import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasCComponent } from './medias-c.component';

describe('MediasCComponent', () => {
  let component: MediasCComponent;
  let fixture: ComponentFixture<MediasCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediasCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediasCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
