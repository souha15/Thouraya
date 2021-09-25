import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { CadeauxService } from '../../../shared/Services/MediaCenter/CadeauxSouvenirs/cadeaux.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Cadeaux } from '../../../shared/Models/MediaCenter/CadeauxSouvenirs/cadeaux.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadeaux-list-dir',
  templateUrl: './cadeaux-list-dir.component.html',
  styleUrls: ['./cadeaux-list-dir.component.css']
})
export class CadeauxListDirComponent implements OnInit {

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
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.diretat == "في الانتظار")

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
}
