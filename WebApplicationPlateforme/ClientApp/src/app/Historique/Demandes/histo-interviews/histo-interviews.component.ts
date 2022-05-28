import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';

@Component({
  selector: 'app-histo-interviews',
  templateUrl: './histo-interviews.component.html',
  styleUrls: ['./histo-interviews.component.css']
})
export class HistoInterviewsComponent implements OnInit {

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
      this.DemandList = res;
    })
  }

  /* Populate Form */

  dem: Interview = new Interview();
  populateForm(dem: Interview) {
    this.dem = Object.assign({}, dem);
  }


  /*** Accepter *****/

  date = new Date().toLocaleDateString();
  accept() {
    this.dem.diretat = "موافقة"

    this.demService.PutObservable(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }

  /**  Refuser **/

  refuse() {
    this.dem.diretat = "رفض"
    this.demService.PutObservable(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }

  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demService.Delete(id)
        .subscribe(res => {
          this.GetDemandList();
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
