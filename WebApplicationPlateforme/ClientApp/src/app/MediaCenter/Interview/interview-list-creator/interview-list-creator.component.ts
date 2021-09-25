import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-interview-list-creator',
  templateUrl: './interview-list-creator.component.html',
  styleUrls: ['./interview-list-creator.component.css']
})
export class InterviewListCreatorComponent implements OnInit {

  constructor(private interviewService: InterviewService,
  private toastr: ToastrService,
  private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getInterList();
  }
  p: Number = 1;
  count: Number = 5;

  //Get Inter List
  interList: Interview[] = [];
  getInterList() {
    this.interviewService.List().subscribe(res => {
      this.interList = res
      console.log(this.interList)
    })
  }


  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.interviewService.Delete(Id)
        .subscribe(res => {
          this.getInterList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
}
