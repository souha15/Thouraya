import { Component, OnInit } from '@angular/core';
import { Commun } from '../../../shared/Models/Decisions/commun.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommunsService } from '../../../shared/Services/Decisions/communs.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-commun-details',
  templateUrl: './commun-details.component.html',
  styleUrls: ['./commun-details.component.css']
})
export class CommunDetailsComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private decService: CommunsService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private route: ActivatedRoute, ) { }
  ngOnInit(): void {
    this.getIdUrl();
  }

  Id: number = 0;
  edit: boolean = false;
  dem: Commun = new Commun();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']  
        this.decService.GetById(this.Id).subscribe(res => {
          this.dem = res;      
        })    
    })
  }

}
