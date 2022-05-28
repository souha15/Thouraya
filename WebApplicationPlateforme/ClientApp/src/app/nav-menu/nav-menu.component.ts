import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { Router } from '@angular/router';
import { PrivilegesService } from '../shared/Services/User/privileges.service';
import { VoitureService } from '../shared/Services/voiture/voiture.service';
import { Voiture } from '../shared/Models/voiture/voiture.model';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { DemPayChequeService } from '../shared/Services/Cheques/dem-pay-cheque.service';
import { DemPayCheque } from '../shared/Models/Cheques/dem-pay-cheque.model';
import { PointageService } from '../shared/Services/Pointage/pointage.service';
import { UserDetail } from '../shared/Models/User/user-detail.model';
import { Pointage } from '../shared/Models/Pointage/pointage.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private router: Router,) {}

  ngOnInit(): void {
    this.getUserConnected();
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login-page');
  }
  checker(arr1, arr2) {
    return arr1.some(elem => arr2.includes(elem));
  }


  // Get User Connected
  userDetails: UserDetail = new UserDetail();
  user: UserDetail = new UserDetail();
  
  UserIdConnected: string;
  UserNameConnected: string='';
  roleslist: any = [];
  testroledir: boolean = false;
  allowedRoles = ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORETAB', 'DIRECTORADMN', 'RESSOURCEHUMAINE', 'RESPFINANCE', 'DAWAAPRIV', 'DOTPRIV', 'FINPRIV', 'DIRPRIV'];

  async getUserConnected(): Promise<any> {
    this.user = await this.UserService.getUserConnected();
    this.UserNameConnected = this.user.fullName;
    this.UserIdConnected = this.user.id
    this.UserService.getUserRoles(this.user.id).subscribe(res => {
        this.roleslist = res;
      if (this.checker(this.roleslist, this.allowedRoles)) {
          this.testroledir = true;

        } else {
          this.testroledir = false;
        }
   
    })
  }


}
