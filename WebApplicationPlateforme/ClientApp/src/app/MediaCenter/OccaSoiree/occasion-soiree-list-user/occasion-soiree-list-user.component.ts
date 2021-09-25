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
  selector: 'app-occasion-soiree-list-user',
  templateUrl: './occasion-soiree-list-user.component.html',
  styleUrls: ['./occasion-soiree-list-user.component.css']
})
export class OccasionSoireeListUserComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: SoireeOccasionService,) { }

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

  DemandListGlobal: OccasionSoiree[] = [];
  DemandList: OccasionSoiree[] = [];
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
