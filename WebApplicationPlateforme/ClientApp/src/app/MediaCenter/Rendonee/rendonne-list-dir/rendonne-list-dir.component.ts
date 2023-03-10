import { Component, OnInit } from '@angular/core';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { RendoneeService } from '../../../shared/Services/MediaCenter/Rendonee/rendonee.service';
import { Rendonne } from '../../../shared/Models/MediaCenter/Rendonee/rendonne.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rendonne-list-dir',
  templateUrl: './rendonne-list-dir.component.html',
  styleUrls: ['./rendonne-list-dir.component.css']
})
export class RendonneListDirComponent implements OnInit {
  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: RendoneeService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.SettingsList();
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

  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];


  SettingsList() {
    this.menuSettings.GetTypeRendo().subscribe(res => {
      this.settingList = res;
    })

  }


  /* Populate Form */

  dem: Rendonne = new Rendonne();

  populateForm(dem: Rendonne) {
    this.dem = Object.assign({}, dem);
  }



  /* Demand List */

  DemandListGlobal: Rendonne[] = [];
  DemandList: Rendonne[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.diretat == "???? ????????????????")

    })
  }


  /*** Accepter *****/
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  date = new Date().toLocaleDateString();
  accept() {
    this.dem.diretat = "????????????"
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;
    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("????  ???????? ?????????? ??????????", "????????");
      this.msg = "????  ???????? ?????????? ??????????"
      this.succ = true;
      this.failed = false;
    },
      err => {
        this.toastr.warning('???? ??????  ???????? ??????????', ' ??????');
        this.failed = true;
        this.succ = false;
        this.msg = "???? ??????  ???????? ??????????"
      })

  }

  /**  Refuser **/

  refuse() {
    this.dem.diretat = "??????"
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;

    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("????  ?????? ?????????? ??????????", "????????");
      this.succ = true;
      this.failed = false;
      this.msg = "????  ?????? ?????????? ??????????"
    },
      err => {
        this.toastr.warning('???? ?????? ?????? ?????????? ', ' ??????');
        this.msg = "???? ?????? ?????? ?????????? "
        this.failed = true;
        this.succ = false;
      })
  }
}
