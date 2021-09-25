import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ExthechniqueService } from '../../../shared/Services/MediaCenter/ExtensionTechnique/exthechnique.service';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Exthechnique } from '../../../shared/Models/MediaCenter/ExtensionTechnique/exthechnique.model';

@Component({
  selector: 'app-exthechnique-list-dir',
  templateUrl: './exthechnique-list-dir.component.html',
  styleUrls: ['./exthechnique-list-dir.component.css']
})
export class ExthechniqueListDirComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,    
    private demService: ExthechniqueService) { }

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

  DemandListGlobal: Exthechnique[] = [];
  DemandList: Exthechnique[] = [];
  GetDemandList() {
    this.demService.ListExthechnique().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.diretat == "في الانتظار")
     

    })
  }

  /* Populate Form */

  dem: Exthechnique = new Exthechnique();
  populateForm(dem: Exthechnique) {
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

}
