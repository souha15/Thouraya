import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { RecordingArchiveService } from '../../../shared/Services/MediaCenter/RecordingArchive/recording-archive.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { RecordingArchive } from '../../../shared/Models/MediaCenter/RecordingArchive/recording-archive.model';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-recording-archive-add',
  templateUrl: './recording-archive-add.component.html',
  styleUrls: ['./recording-archive-add.component.css']
})
export class RecordingArchiveAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: RecordingArchiveService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.SettingsList();
    const datePipe = new DatePipe('en-Us');

    this.today = new Date().toISOString().slice(0, 16)
  }
  today;

  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      if (res.idDepartement != null) {
        this.idEtab = res.idDepartement;
        this.nomEtab = res.nomDepartement;
      }
    })

  }

  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];

  SettingsList() {
    this.menuSettings.GetRecording().subscribe(res => {
      this.settingList = res;
    })
  }

  /** OnSubmit **/

  dem: RecordingArchive = new RecordingArchive();
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
      if (this.idEtab != null) {
        this.dem.etabid = this.idEtab.toString();
        this.dem.etabnom = this.nomEtab;
      }
      this.demService.CreateRecordingArchive(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
