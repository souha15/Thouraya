import { Component, OnInit } from '@angular/core';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { RendoneeService } from '../../../shared/Services/MediaCenter/Rendonee/rendonee.service';
import { Rendonne } from '../../../shared/Models/MediaCenter/Rendonee/rendonne.model';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rendonne-add',
  templateUrl: './rendonne-add.component.html',
  styleUrls: ['./rendonne-add.component.css']
})
export class RendonneAddComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: RendoneeService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.SettingsList();
    const datePipe = new DatePipe('en-Us');

    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');
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
    this.menuSettings.GetTypeRendo().subscribe(res => {
      this.settingList = res;
    })

  }

  /** OnSubmit **/

  dem: Rendonne = new Rendonne();
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
      this.demService.Create(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
