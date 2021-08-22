import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFrwardedToTicketListForAgentCodeComponent } from './page-frwarded-to-ticket-list-for-agent-code.component';

describe('PageFrwardedToTicketListForAgentCodeComponent', () => {
  let component: PageFrwardedToTicketListForAgentCodeComponent;
  let fixture: ComponentFixture<PageFrwardedToTicketListForAgentCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFrwardedToTicketListForAgentCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFrwardedToTicketListForAgentCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
