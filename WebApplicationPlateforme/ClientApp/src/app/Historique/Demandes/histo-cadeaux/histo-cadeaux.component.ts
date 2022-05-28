import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CadeauxService } from '../../../shared/Services/MediaCenter/CadeauxSouvenirs/cadeaux.service';
import { Cadeaux } from '../../../shared/Models/MediaCenter/CadeauxSouvenirs/cadeaux.model';

@Component({
  selector: 'app-histo-cadeaux',
  templateUrl: './histo-cadeaux.component.html',
  styleUrls: ['./histo-cadeaux.component.css']
})
export class HistoCadeauxComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: CadeauxService) { }

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

  DemandListGlobal: Cadeaux[] = [];
  DemandList: Cadeaux[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandList = res;

    })
  }

  /* Populate Form */

  dem: Cadeaux = new Cadeaux();
  oc: boolean = false;
  ho: boolean = false;
  populateForm(dem: Cadeaux) {
    this.dem = Object.assign({}, dem);
    if (this.dem.PartieHonor == "أخرى") {
      this.ho = true;
    } else {
      this.ho = false;
    }

    if (this.dem.PartieHonor == "أخرى") {
      this.oc = true;
    } else {
      this.oc = true
    }

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
