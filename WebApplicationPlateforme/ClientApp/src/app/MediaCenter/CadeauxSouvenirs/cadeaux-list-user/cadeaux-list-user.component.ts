import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { CadeauxService } from '../../../shared/Services/MediaCenter/CadeauxSouvenirs/cadeaux.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Cadeaux } from '../../../shared/Models/MediaCenter/CadeauxSouvenirs/cadeaux.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadeaux-list-user',
  templateUrl: './cadeaux-list-user.component.html',
  styleUrls: ['./cadeaux-list-user.component.css']
})
export class CadeauxListUserComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: CadeauxService) { }

  ngOnInit(): void {
    this.SettingsList();
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

  /** Get Type List **/


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

  /* Demand List */

  DemandListGlobal: Cadeaux[] = [];
  DemandList: Cadeaux[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })
  }

  /* Populate Form */

  dem: Cadeaux = new Cadeaux();
  oc: boolean = false;
  ho: boolean = false;
  populateForm(dem: Cadeaux ) {
    this.dem = Object.assign({}, dem);
    if (this.dem.PartieHonor == "أخرى") {
      this.ho = true;
    } else {
      this.ho = false;
    }

    if (this.dem.PartieHonor == "أخرى") {
      this.oc = true;
    } else {
      this.oc=true
      }
    
  }

  /* Edit*/

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.demService.PutObservableE(this.dem).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
        this.GetDemandList();

      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        })
    }
  }

  /*Delete*/
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.demService.Delete(Id)
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
