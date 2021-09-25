import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { VisiteService } from '../../../shared/Services/MediaCenter/Visite/visite.service';
import { OffreImpressionService } from '../../../shared/Services/MediaCenter/Visite/offre-impression.service';
import { OffreImpression } from '../../../shared/Models/MediaCenter/Visite/offre-impression.model';
import { Visite } from '../../../shared/Models/MediaCenter/Visite/visite.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visite-edit',
  templateUrl: './visite-edit.component.html',
  styleUrls: ['./visite-edit.component.css']
})
export class VisiteEditComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private UserService: UserServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private demService: VisiteService,
    private guestService: OffreImpressionService) { }


  ngOnInit(): void {
    this.getIdUrl();
  }

  //get the id in Url

  Id: number;
  dem: Visite = new Visite();
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
  guestLis: OffreImpression[] = [];
  guestList: OffreImpression[] = [];
  guestTest: boolean = false;
  getGuest() {

    this.guestService.List().subscribe(res => {
      this.guestLis = res
      this.guestList = this.guestLis.filter(item => item.idvisite == this.Id)
      if (this.guestList.length != 0) {
        this.guestTest = true
      } else {
        this.guestTest = false
      }
    })
  }


  guest: OffreImpression = new OffreImpression();
  guestList2: OffreImpression[] = [];
  guestTest2: boolean = false;
  i: number = 0;
  add() {
    this.guestTest2 = true;
    this.guestList2[this.i] = this.guest;
    this.guest = new OffreImpression();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.guestList2.splice(this.guestList2.indexOf(dp), 1);
    this.i = this.i - 1
    this.guest = new OffreImpression();
  }

  del2(Id) {
    this.guestService.Delete(Id).subscribe(res => {
      this.getGuest();
    })
  }

  /** OnSubmit **/


  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Dem2: Visite = new Visite();
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
            this.guest.idvisite = this.Id;
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
