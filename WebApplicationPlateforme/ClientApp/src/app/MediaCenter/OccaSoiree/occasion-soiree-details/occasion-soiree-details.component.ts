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
  selector: 'app-occasion-soiree-details',
  templateUrl: './occasion-soiree-details.component.html',
  styleUrls: ['./occasion-soiree-details.component.css']
})
export class OccasionSoireeDetailsComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private demService: SoireeOccasionService,
    private guestService: GuestSoireeOccasionService) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  //get the id in Url

  Id: number;
  dem: OccasionSoiree = new OccasionSoiree();
  guestLis: GuestSoiree[] = [];
  guestList: GuestSoiree[] = [];
  guestTest: boolean = false;
  autre: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.demService.GetById(this.Id).subscribe(res => {
        this.dem = res

        if (this.dem.type == "أخرى") {
          this.autre = true;
        } else {
          this.autre = false;
        }
        this.guestService.List().subscribe(res => {
          this.guestLis = res
          this.guestList = this.guestLis.filter(item => item.idSoiree == this.Id)
          if (this.guestList.length != 0) {
            this.guestTest = true
          } else {
            this.guestTest =false
          }
        })
      })
    });
  }
}
