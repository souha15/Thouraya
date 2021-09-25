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
  selector: 'app-visite-details',
  templateUrl: './visite-details.component.html',
  styleUrls: ['./visite-details.component.css']
})
export class VisiteDetailsComponent implements OnInit {

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

}
