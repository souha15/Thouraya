import { Component, OnInit } from '@angular/core';
import { EventsTwoService } from '../../shared/Services/EventsTwo/events-two.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { EventsTwo } from '../../shared/Models/EventsTwo/events-two.model';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { PiecesJointesEventsTwo } from '../../shared/Models/EventsTwo/pieces-jointes-events-two.model';

@Component({
  selector: 'app-event-two-list',
  templateUrl: './event-two-list.component.html',
  styleUrls: ['./event-two-list.component.css']
})
export class EventTwoListComponent implements OnInit {

  constructor(private eventsService: EventsTwoService,
    private UploadDownService: UploadDownloadService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getNewsList();
  }


  per: EventsTwo = new EventsTwo();
  populateForm(conge: EventsTwo) {
    this.per = Object.assign({}, conge)
    this.eventsService.formData = Object.assign({}, conge)
  }

  List: EventsTwo[] = [];
  newsList: EventsTwo[] = [];
  getNewsList() {
    this.eventsService.Get().subscribe(res => {
      this.newsList = res
      this.newsList.reverse();
    })
  }
}
