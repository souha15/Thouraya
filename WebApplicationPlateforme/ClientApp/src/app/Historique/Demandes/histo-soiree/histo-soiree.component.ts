import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SoireeOccasionService } from '../../../shared/Services/MediaCenter/OccaSoiree/soiree-occasion.service';
import { OccasionSoiree } from '../../../shared/Models/MediaCenter/OccaSoiree/occasion-soiree.model';

@Component({
  selector: 'app-histo-soiree',
  templateUrl: './histo-soiree.component.html',
  styleUrls: ['./histo-soiree.component.css']
})
export class HistoSoireeComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: SoireeOccasionService, ) { }

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

  DemandListGlobal: OccasionSoiree[] = [];
  DemandList: OccasionSoiree[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandList = res;

    })
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

  /* Populate Form */
  dem: OccasionSoiree = new OccasionSoiree();
  populateForm(dem: OccasionSoiree) {
    this.dem = Object.assign({}, dem);

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
}
