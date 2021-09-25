import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { RecordingArchiveService } from '../../../shared/Services/MediaCenter/RecordingArchive/recording-archive.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Cadeaux } from '../../../shared/Models/MediaCenter/CadeauxSouvenirs/cadeaux.model';
import { NgForm } from '@angular/forms';
import { CadeauxService } from '../../../shared/Services/MediaCenter/CadeauxSouvenirs/cadeaux.service';

@Component({
  selector: 'app-cadeaux-add',
  templateUrl: './cadeaux-add.component.html',
  styleUrls: ['./cadeaux-add.component.css']
})
export class CadeauxAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: CadeauxService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.SettingsList();
  }

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
  settingList2: TbListening[] = [];

  SettingsList() {
    this.menuSettings.GetTypeHonor().subscribe(res => {
      this.settingList = res;
    })
    this.menuSettings.GetTypeOccasion().subscribe(res => {
      this.settingList2 = res;
    })

  }

  /** OnSubmit **/

  dem: Cadeaux = new Cadeaux();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.dateenreg = this.date;
      this.dem.diretat = "في الانتظار";
      this.dem.idUserCreator = this.UserId;
      this.dem.userNameCreator = this.UserName;
      this.dem.etabid = this.idEtab.toString();
      this.dem.etabnom = this.nomEtab;
      this.demService.Create(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }

  honor: boolean = false;
  getHonor(event) {

    if (event.target.value == "أخرى") {
      this.honor = true;

    } else {
      this.honor = false;

    }
  }

  occ: boolean = false;
  getOccasion(event) {
 
    if (event.target.value == "أخرى") {
      this.occ = true;

    } else {
      this.occ = false;

    }
  }
}
