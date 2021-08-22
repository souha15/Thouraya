import { Component, OnInit } from '@angular/core';
import { EventsTwoService } from '../../shared/Services/EventsTwo/events-two.service';
import { ActivatedRoute } from '@angular/router';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { Subscription } from 'rxjs';
import { EventsTwo } from '../../shared/Models/EventsTwo/events-two.model';
import { PiecesJointesEventsTwo } from '../../shared/Models/EventsTwo/pieces-jointes-events-two.model';

@Component({
  selector: 'app-event-two-gallery',
  templateUrl: './event-two-gallery.component.html',
  styleUrls: ['./event-two-gallery.component.css']
})
export class EventTwoGalleryComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private newsService: EventsTwoService,
    private route: ActivatedRoute,
    private updoService: UploadDownloadService) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getDetails();
  }

  //get id in URl
  newsId: number;
  news: EventsTwo = new EventsTwo();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.newsId = params['id']
    });

  }

  // getTask
  pathurl: string;
  photosList: PiecesJointesEventsTwo[] = [];
  FphotosList: PiecesJointesEventsTwo[] = [];
  list: any[];
  getDetails() {
    this.updoService.SearchEvTwo().subscribe(res => {
      this.photosList = res
      this.FphotosList = this.photosList.filter(item => item.idEv == this.newsId && item.type =="photos")
    })
  }


  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
