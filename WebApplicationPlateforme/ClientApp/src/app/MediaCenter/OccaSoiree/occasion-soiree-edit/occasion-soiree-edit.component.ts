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
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-occasion-soiree-edit',
  templateUrl: './occasion-soiree-edit.component.html',
  styleUrls: ['./occasion-soiree-edit.component.css']
})
export class OccasionSoireeEditComponent implements OnInit {
  private routeSub: Subscription;
   
  constructor(private route: ActivatedRoute,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: SoireeOccasionService,
    private guestService: GuestSoireeOccasionService) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.SettingsList()
  }


  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];

  SettingsList() {
    this.menuSettings.GetOccSoi().subscribe(res => {
      this.settingList = res;
    })

  }



//get the id in Url

Id: number;
dem: OccasionSoiree = new OccasionSoiree();
autre: boolean = false;
getIdUrl() {
  this.routeSub = this.route.params.subscribe(params => {
    this.Id = params['id']

    this.demService.GetById(this.Id).subscribe(res => {
      this.dem = res
      this.getGuest();
      if (this.dem.type == "أخرى") {
        this.autre = true;
      } else {
        this.autre = false;
      }

    })
  });
}

/** Guest Add*/
  guestLis: GuestSoiree[] = [];
  guestList: GuestSoiree[] = [];
  guestTest: boolean = false;
  getGuest() {

    this.guestService.List().subscribe(res => {
      this.guestLis = res
      this.guestList = this.guestLis.filter(item => item.idSoiree == this.Id)
      if (this.guestList.length != 0) {
        this.guestTest = true
      } else {
        this.guestTest = false
      }
    })
  }


  guest: GuestSoiree = new GuestSoiree();
  guestList2: GuestSoiree[] = [];
  guestTest2: boolean = false;
  i: number = 0;
  add() {
    this.guestTest2 = true;
    this.guestList2[this.i] = this.guest;
    this.guest = new GuestSoiree();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.guestList2.splice(this.guestList2.indexOf(dp), 1);
    this.i = this.i - 1
    this.guest = new GuestSoiree();
  }

  del2(Id) {
    this.guestService.Delete(Id).subscribe(res => {
      this.getGuest();
    })
  }

  /** OnSubmit **/


  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Dem2: OccasionSoiree = new OccasionSoiree();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;

      this.demService.PutObservableE(this.dem).subscribe(res => {
        if (this.guestTest) {

          for (let i = 0; i < this.guestList2.length; i++) {
            this.guest = this.guestList2[i]
            this.guest.idSoiree = this.Id;
            this.guestService.Create(this.guest).subscribe(res => {

            },
              err => {
                this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
              })
          }
        }

        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.guestTest = false;
        this.guestTest2 = false;
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
