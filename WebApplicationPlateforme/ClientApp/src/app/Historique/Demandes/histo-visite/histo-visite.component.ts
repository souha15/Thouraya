import { Component, OnInit } from '@angular/core';
import { Visite } from '../../../shared/Models/MediaCenter/Visite/visite.model';
import { OffreImpressionService } from '../../../shared/Services/MediaCenter/Visite/offre-impression.service';
import { VisiteService } from '../../../shared/Services/MediaCenter/Visite/visite.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-visite',
  templateUrl: './histo-visite.component.html',
  styleUrls: ['./histo-visite.component.css']
})
export class HistoVisiteComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: VisiteService,
    private guestService: OffreImpressionService) { }

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

  DemandListGlobal: Visite[] = [];
  DemandList: Visite[] = [];
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

  /* Populate Form */
  dem: Visite = new Visite();
  populateForm(dem: Visite) {
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
