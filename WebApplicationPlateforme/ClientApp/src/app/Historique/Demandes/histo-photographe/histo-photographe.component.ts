import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { RecordingArchiveService } from '../../../shared/Services/MediaCenter/RecordingArchive/recording-archive.service';
import { RecordingArchive } from '../../../shared/Models/MediaCenter/RecordingArchive/recording-archive.model';

@Component({
  selector: 'app-histo-photographe',
  templateUrl: './histo-photographe.component.html',
  styleUrls: ['./histo-photographe.component.css']
})
export class HistoPhotographeComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: RecordingArchiveService) { }

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

  DemandListGlobal: RecordingArchive[] = [];
  DemandList: RecordingArchive[] = [];
  GetDemandList() {
    this.demService.ListRecordingArchive().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.diretat == "في الانتظار")


    })
  }

  /* Populate Form */

  dem: RecordingArchive = new RecordingArchive();
  populateForm(dem: RecordingArchive) {
    this.dem = Object.assign({}, dem);
  }

  /*** Accepter *****/

  date = new Date().toLocaleDateString();
  accept() {
    this.dem.diretat = "موافقة"
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;
    this.demService.PutObservableE(this.dem).subscribe(res => {
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
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;

    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demService.DeleteRecordingArchive(id)
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
