import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { VisiteService } from '../../../shared/Services/MediaCenter/Visite/visite.service';
import { OffreImpressionService } from '../../../shared/Services/MediaCenter/Visite/offre-impression.service';
import { OffreImpression } from '../../../shared/Models/MediaCenter/Visite/offre-impression.model';
import { Visite } from '../../../shared/Models/MediaCenter/Visite/visite.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-visite-add',
  templateUrl: './visite-add.component.html',
  styleUrls: ['./visite-add.component.css']
})
export class VisiteAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: VisiteService,
    private guestService: OffreImpressionService) { }

  ngOnInit(): void {
    this.getUserConnected();

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



  /** Guest Add*/
  guest: OffreImpression = new OffreImpression();
  guestList: OffreImpression[] = [];
  i: number = 0;
  guestTest: boolean = false;
  add() {
    this.guestTest = true;
    this.guestList[this.i] = this.guest;
    this.guest = new OffreImpression();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.guestList.splice(this.guestList.indexOf(dp), 1);
    this.i = this.i - 1
    this.guest = new OffreImpression();
  }


  /** OnSubmit **/

  dem: Visite = new Visite();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Dem2: Visite = new Visite();
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
        this.Dem2 = res;
        if (this.guestTest) {

          for (let i = 0; i < this.guestList.length; i++) {
            this.guest = this.guestList[i]
            this.guest.idvisite = this.Dem2.id;
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
