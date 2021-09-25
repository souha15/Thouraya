import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { VisiteService } from '../../../shared/Services/MediaCenter/Visite/visite.service';
import { OffreImpressionService } from '../../../shared/Services/MediaCenter/Visite/offre-impression.service';
import { OffreImpression } from '../../../shared/Models/MediaCenter/Visite/offre-impression.model';
import { Visite } from '../../../shared/Models/MediaCenter/Visite/visite.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-visite-list-user',
  templateUrl: './visite-list-user.component.html',
  styleUrls: ['./visite-list-user.component.css']
})
export class VisiteListUserComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: VisiteService,
    private guestService: OffreImpressionService) { }

  ngOnInit(): void {
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

  /* Demand List */

  DemandListGlobal: Visite[] = [];
  DemandList: Visite[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })
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
}
