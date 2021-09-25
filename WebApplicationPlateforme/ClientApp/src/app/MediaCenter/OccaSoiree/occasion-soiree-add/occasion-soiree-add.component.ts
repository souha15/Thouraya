import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { SoireeOccasionService } from '../../../shared/Services/MediaCenter/OccaSoiree/soiree-occasion.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { OccasionSoiree } from '../../../shared/Models/MediaCenter/OccaSoiree/occasion-soiree.model';
import { NgForm } from '@angular/forms';
import { GuestSoiree } from '../../../shared/Models/MediaCenter/OccaSoiree/guest-soiree.model';
import { GuestSoireeOccasionService } from '../../../shared/Services/MediaCenter/OccaSoiree/guest-soiree-occasion.service';

@Component({
  selector: 'app-occasion-soiree-add',
  templateUrl: './occasion-soiree-add.component.html',
  styleUrls: ['./occasion-soiree-add.component.css']
})
export class OccasionSoireeAddComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: SoireeOccasionService,
    private guestService: GuestSoireeOccasionService) { }

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

  SettingsList() {
    this.menuSettings.GetOccSoi().subscribe(res => {
      this.settingList = res;
    })

  }

  /** Guest Add*/
  guest: GuestSoiree = new GuestSoiree();
  guestList: GuestSoiree[] = [];
  i: number = 0;
  guestTest: boolean = false;
  add() {
    this.guestTest = true;
    this.guestList[this.i] = this.guest;
    this.guest = new GuestSoiree();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.guestList.splice(this.guestList.indexOf(dp), 1);
    this.i = this.i - 1
    this.guest = new GuestSoiree();
  }


  /** OnSubmit **/

  dem: OccasionSoiree = new OccasionSoiree();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Dem2: OccasionSoiree = new OccasionSoiree();
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
        this.Dem2 = res;
        if (this.guestTest) {

          for (let i = 0; i < this.guestList.length; i++) {
            this.guest = this.guestList[i]
            this.guest.idSoiree = this.Dem2.id;
            this.guestService.Create(this.guest).subscribe(res => {
         
            },
              err => {
                this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
              })
          }
        }

        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.guestList.splice(0, this.guestList.length)
        this.guestTest = false;
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }

  occ: boolean = false;
  getOcc(event) {

    if (event.target.value == "أخرى") {
      this.occ = true;

    } else {
      this.occ = false;

    }
  }



}
