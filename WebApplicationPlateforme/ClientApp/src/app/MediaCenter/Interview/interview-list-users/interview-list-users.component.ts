import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-interview-list-users',
  templateUrl: './interview-list-users.component.html',
  styleUrls: ['./interview-list-users.component.css']
})
export class InterviewListUsersComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: InterviewService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList();
  }

  p: Number = 1;
  count: Number = 5;

  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      this.idEtab = res.idDepartement;
      this.nomEtab = res.nomDepartement;
    })

  }


  /* Demand List */

  DemandListGlobal: Interview[] = [];
  DemandList: Interview[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.diretat == "في الإنتظار")


    })
  }

  /* Populate Form */

  dem: Interview = new Interview();
  populateForm(dem: Interview) {
    this.dem = Object.assign({}, dem);
  }


  /*** Accepter *****/
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  date = new Date().toLocaleDateString();
  accept() {
    this.dem.diretat = "موافقة"
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;
    this.demService.PutObservable(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
      this.msg = "تم  قبول الطلب بنجاح"
      this.succ = true;
      this.failed = false;
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
        this.failed = true;
        this.succ = false;
        this.msg = "لم يتم  قبول الطلب"
      })

  }

  /**  Refuser **/

  refuse() {
    this.dem.diretat = "رفض"
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;

    this.demService.PutObservable(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
      this.succ = true;
      this.failed = false;
      this.msg = "تم  رفض الطلب بنجاح"
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
        this.msg = "لم يتم رفض الطلب "
        this.failed = true;
        this.succ = false;
      })
  }

}
