import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  constructor(private interviewService: InterviewService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
     this.getInterList();
  }

  //Get Inter List
  interList: Interview[] = [];
  getInterList() {
    this.interviewService.List().subscribe(res => {
      this.interList = res
      console.log(this.interList)
    })
  }
}
