import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { TypeInterviewService } from '../../../shared/Services/MediaCenter/Interview/type-interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css']
})
export class InterviewDetailsComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private interviewService: InterviewService,
    private typeInterService: TypeInterviewService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.getUrl();
  }


  //Get Interview Data
  ev: Interview = new Interview();
  interId: number;
  media: boolean = false;
  presse: boolean = false;
  autre: boolean = false;
  getUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.interId = params['id']

      this.interviewService.GetById(this.interId).subscribe(res => {
        this.ev = res

        if (this.ev.type == "حملة إعلامية لبرنامج محدد ") {
          this.media = true;
        } else {
          this.media = false;
        }

        if (this.ev.type == "تغطية صحفية ") {
          this.presse = true;
        } else {
          this.presse = false;
        }

        if (this.ev.type == "أخرى") {
          this.autre = true;
        } else {
          this.autre = false;
        }

      })
    });

  }
}
